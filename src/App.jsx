import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [price, setPrice] = useState('');
  const [totalGrams, setTotalGrams] = useState('');
  const [proteinPerServing, setProteinPerServing] = useState('');
  const [gramsPerServing, setGramsPerServing] = useState('');
  const [proteinName, setProteinName] = useState('');
  const [proteinList, setProteinList] = useState(() => {
    const saved = localStorage.getItem('proteinList');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('proteinList', JSON.stringify(proteinList));
  }, [proteinList]);

  const calculateProteinCost = () => {
    if (!price || !totalGrams || !proteinPerServing || !gramsPerServing) {
      return 0;
    }
    const pricePerKilo = price / (totalGrams / 1000);
    const servingsPerKg = 1000 / gramsPerServing;
    const proteinPerKg = proteinPerServing * servingsPerKg;
    const proteinPerDollar = proteinPerKg / pricePerKilo;

    return proteinPerDollar.toFixed(2);
  };

  const handleSave = () => {
    if (
      proteinName &&
      price &&
      totalGrams &&
      proteinPerServing &&
      gramsPerServing
    ) {
      const costPerGram = calculateProteinCost();
      const newProtein = {
        name: proteinName,
        price,
        totalGrams,
        proteinPerServing,
        gramsPerServing,
        costPerGram,
      };
      setProteinList([...proteinList, newProtein]);
      setProteinName('');
      setPrice('');
      setTotalGrams('');
      setProteinPerServing('');
      setGramsPerServing('');
    }
  };

  const handleDelete = (index) => {
    const updatedList = proteinList.filter((_, i) => i !== index);
    setProteinList(updatedList);
  };

  return (
    <div className="app-container">
      <div className="calculator-card">
        <h1 className="title">Protein Calculator</h1>
        <p className="description">
          Calculate the cost of protein per gram and save your entries.
        </p>

        <div className="input-group">
          <label className="label">Protein Name</label>
          <input
            type="text"
            value={proteinName}
            onChange={(e) => setProteinName(e.target.value)}
            className="input"
            placeholder="Enter protein name"
          />
        </div>

        <div className="input-group">
          <label className="label">Price ($)</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="input"
            placeholder="Enter price"
          />
        </div>

        <div className="input-group">
          <label className="label">Total Grams</label>
          <input
            type="number"
            value={totalGrams}
            onChange={(e) => setTotalGrams(e.target.value)}
            className="input"
            placeholder="Enter total grams"
          />
        </div>

        <div className="input-group">
          <label className="label">Protein Per Serving (g)</label>
          <input
            type="number"
            value={proteinPerServing}
            onChange={(e) => setProteinPerServing(e.target.value)}
            className="input"
            placeholder="Enter protein per serving"
          />
        </div>

        <div className="input-group">
          <label className="label">Grams Per Serving</label>
          <input
            type="number"
            value={gramsPerServing}
            onChange={(e) => setGramsPerServing(e.target.value)}
            className="input"
            placeholder="Enter grams per serving"
          />
        </div>

        <button className="calculate-button" onClick={handleSave}>
          Save
        </button>

        <div className="result">
          <h2 className="result-title">Grams Of Protein Per Dollar</h2>
          <p className="result-value">{calculateProteinCost()} g of Protein</p>
        </div>

        {proteinList.length > 0 && (
          <div className="saved-list">
            <h2 className="saved-title">Saved Proteins</h2>
            <ul>
              {proteinList.map((protein, index) => (
                <li key={index} className="saved-item">
                  <strong>{protein.name}</strong>: {protein.costPerGram} g of
                  Protein
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
