import React, { useState, useEffect } from "react";
import "./Binary.css";

const Binary = () => {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);

  // Load history from localStorage
  useEffect(() => {
    try {
      const savedHistory = JSON.parse(localStorage.getItem("conversionHistory")) || [];
      setHistory(savedHistory.slice(0, 10)); // Ensure max 10 items
    } catch (e) {
      console.error("Failed to load history", e);
    }
  }, []);

  const convertToBinary = () => {
    setError("");
    const decimalNumber = parseInt(decimal, 10);

    if (!decimal || isNaN(decimalNumber)) {
      setError("Please enter a valid positive integer");
      return;
    }

    if (decimalNumber < 0) {
      setError("Negative numbers are not supported");
      return;
    }

    const binaryResult = decimalNumber.toString(2);
    setBinary(binaryResult);

    const newEntry = { 
      decimal: decimalNumber.toString(), 
      binary: binaryResult,
      timestamp: new Date().toISOString() 
    };

    const updatedHistory = [newEntry, ...history].slice(0, 10);
    setHistory(updatedHistory);
    localStorage.setItem("conversionHistory", JSON.stringify(updatedHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("conversionHistory");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") convertToBinary();
  };

  return (
    <div className="converter-container">
      <header className="converter-header">
        <h1 className="title-animation">Decimal to Binary Converter</h1>
        <p className="subtitle">Convert base-10 numbers to binary (base-2)</p>
      </header>

      <div className="converter-box">
        <div className="input-group">
          <input
            type="number"
            value={decimal}
            onChange={(e) => setDecimal(e.target.value.replace(/[^0-9]/g, ""))}
            onKeyPress={handleKeyPress}
            placeholder="e.g. 42"
            aria-label="Enter decimal number"
            min="0"
          />
          <button 
            onClick={convertToBinary}
            className="convert-button"
            aria-label="Convert to binary"
          >
            Convert
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        {binary && (
          <div className="result-container">
            <h2>
              <span className="result-label">Binary Result:</span>
              <span className="result-value">{binary}</span>
            </h2>
          </div>
        )}
      </div>

      {history.length > 0 && (
        <section className="history-section">
          <div className="history-header">
            <h3>Recent Conversions</h3>
            <button 
              onClick={clearHistory} 
              className="clear-button"
              aria-label="Clear history"
            >
              Clear All
            </button>
          </div>
          
          <ul className="history-list">
            {history.map((entry, index) => (
              <li key={`${entry.timestamp}-${index}`} className="history-item">
                <span className="history-decimal">{entry.decimal}</span>
                <span className="history-arrow">→</span>
                <span className="history-binary">{entry.binary}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default Binary;
