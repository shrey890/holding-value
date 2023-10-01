import React, { useState } from 'react';
import './App.css';
function App() {
  const [marketCap, setMarketCap] = useState('');
  const [holdingPerc, setHoldingPerc] = useState('');
  const [holdingValue, setHoldingValue] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('Crore'); // Default unit
  const [isCalculating, setIsCalculating] = useState(false); // Track if calculating
  const calculateHoldingValue = () => {
    const marketCapNum = parseFloat(marketCap);
    const holdingPercNum = parseFloat(holdingPerc);
    if (!isNaN(marketCapNum) && !isNaN(holdingPercNum)) {
      let calculatedValue = (marketCapNum * holdingPercNum) / 100;
      // Convert to Crore or Lakh based on the selected unit
      if (selectedUnit === 'Lakh') {
        calculatedValue /= 100;
      } else if (selectedUnit === 'Billions') {
        calculatedValue *= 100;
      } else if (selectedUnit === 'Trillions') {
        calculatedValue *= 10000;
      }
      setHoldingValue(calculatedValue);
    } else {
      setHoldingValue('Invalid input');
    }
  };
  const handleUnitChange = (e) => {
    setSelectedUnit(e.target.value);
  };
  const handleClick = () => {
    // Check if all input fields are filled
    if (marketCap.trim() !== '' && holdingPerc.trim() !== '' && selectedUnit.trim() !== '') {
      setIsCalculating(true); // Set to true to show the result
      calculateHoldingValue();
    }
  };
  return (
    <div className='bold font-bold '>
      <div className="form-container">
        <input
          type="text"
          className='text-black rounded-lg'
          placeholder='Market Cap'
          onChange={ (e) => setMarketCap(e.target.value) }
        />
        <select
          id="underline_select"
          className="block mt-5 py-2.5 px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          onChange={ handleUnitChange }
          value={ selectedUnit }
        >
          <option className='font-bold' value="Lakh">Lakh</option>
          <option className='font-bold' value="Crore">Crore</option>

        </select>
        <input
          type="text"
          className='grid mt-5 rounded-lg'
          placeholder='Holding %'
          onChange={ (e) => setHoldingPerc(e.target.value) }
        />
        <button
          type="button"
          className="mt-5 text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 shadow-lg shadow-teal-500/50 dark:shadow-lg dark:shadow-teal-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
          onClick={ handleClick }
          disabled={ marketCap.trim() === '' || holdingPerc.trim() === '' || selectedUnit.trim() === '' }
        >
          Calculate
        </button>
        { isCalculating && (
          <h2 className='mt-5 '>
            Holding value is { holdingValue } { selectedUnit }
          </h2>
        ) }

      </div>
      <br />
      <footer>
        <a href="https://github.com/shrey890" target='_blank'> &copy; shrey  </a>
      </footer>
    </div>
  );
}
export default App;
