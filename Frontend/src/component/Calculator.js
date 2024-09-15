import React, { useState } from 'react';

function FuelConsumptionCalculator() {
  const [distance, setDistance] = useState('');
  const [efficiency, setEfficiency] = useState('');
  const [fuelPriceINR, setFuelPriceINR] = useState('');
  const [totalCost, setTotalCost] = useState(0);

  const handleCalculate = () => {
    const distanceNum = parseFloat(distance);
    const efficiencyNum = parseFloat(efficiency);
    const fuelPriceINRNum = parseFloat(fuelPriceINR);

    if (!isNaN(distanceNum) && !isNaN(efficiencyNum) && !isNaN(fuelPriceINRNum)) {
      const fuelRequired = distanceNum / efficiencyNum;
      const cost = fuelRequired * fuelPriceINRNum;
      setTotalCost(cost.toFixed(2));
    } else {
      alert('Please enter valid numbers');
    }
  };

  return (
    <div>
      <h2>Fuel Consumption Calculator</h2>
      <div>
        <label>Distance (in km):</label>
        <input type="number" value={distance} onChange={e => setDistance(e.target.value)} />
      </div>
      <div>
        <label>Fuel Efficiency (km/L):</label>
        <input type="number" value={efficiency} onChange={e => setEfficiency(e.target.value)} />
      </div>
      <div>
        <label>Fuel Price (per liter in INR):</label>
        <input type="number" value={fuelPriceINR} onChange={e => setFuelPriceINR(e.target.value)} />
      </div>
      <button onClick={handleCalculate}>Calculate</button>
      {totalCost > 0 && (
        <div>
          <h3>Total Cost (in INR):</h3>
          <p>{`₹${totalCost}`}</p>
        </div>
      )}
    </div>
  );
}

export default FuelConsumptionCalculator;
