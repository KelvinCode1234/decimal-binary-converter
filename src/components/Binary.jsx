import React, { useState, useEffect } from "react";
import "./Binary.css";

const Binary = () => {
  const [decimal, setDecimal] = useState("");
  const [binary, setBinary] = useState("");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem("history")) || [];
    setHistory(savedHistory);
  }, []);

  const convertToBinary = () => {
    const decimalNumber = parseInt(decimal, 10);
    if (isNaN(decimalNumber)) {
      alert("Please enter a valid decimal number.");
      return;
    }

    const binaryResult = decimalNumber.toString(2); 
    setBinary(binaryResult);

    if (history.length < 10) {
      const newHistory = [...history, { decimal, binary: binaryResult }];
      setHistory(newHistory);
      localStorage.setItem("history", JSON.stringify(newHistory));
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("history");
  };

  return (
    <div className="binary-converter">
      <h1 className="flipInY" >Decimal to Binary Converter</h1>
      <div className="box">
        <input
          type="number"
          value={decimal}
          onChange={(e) => setDecimal(e.target.value)}
          placeholder="Enter a decimal number"
        />
        <button onClick={convertToBinary}>Convert</button>
      </div>

      {binary && (
        <div>
          <h2>Binary Result: {binary}</h2>
        </div>
      )}

      <h3>Conversion History:</h3>
      <ul>
        {history.map((entry, index) => (
          <li key={index}>
            {entry.decimal} → {entry.binary}
          </li>
        ))}
      </ul>

      {history.length === 10 && (
        <button className="btn" onClick={clearHistory} style={{ marginTop: "20px", marginBottom: "30px", padding: "10px 20px", cursor: "pointer" }}>
          Delete History
        </button>
      )}
    </div>
  );
}

export default Binary;
