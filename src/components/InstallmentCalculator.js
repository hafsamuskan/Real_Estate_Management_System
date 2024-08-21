// src/components/InstallmentCalculator.js
import React, { useState } from 'react';
import '../styles/InstallmentCalculator.css';

const InstallmentCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState('');
  const [durationYear, setDurationYear] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [installment, setInstallment] = useState(null);

  const calculateInstallment = () => {
    const P = parseFloat(propertyPrice);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseInt(durationYear) * 12;

    if (!isNaN(P) && !isNaN(r) && !isNaN(n)) {
      const monthlyInstallment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      setInstallment(monthlyInstallment.toFixed(2));
    } else {
      setInstallment('Invalid input');
    }
  };

  return (
    <div className="installment-calculator">
      <h2>Instalment Calculator</h2>
      <input
        type="text"
        placeholder="Property Price"
        value={propertyPrice}
        onChange={(e) => setPropertyPrice(e.target.value)}
      />
      <input
        type="text"
        placeholder="Duration Year"
        value={durationYear}
        onChange={(e) => setDurationYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Interest Rate"
        value={interestRate}
        onChange={(e) => setInterestRate(e.target.value)}
      />
      <button onClick={calculateInstallment}>Calculate Installment</button>
      {installment !== null && <div className="installment-result">Monthly Installment: {installment}</div>}
    </div>
  );
};

export default InstallmentCalculator;
