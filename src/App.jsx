import React, { useState } from "react";
import "./App.css";

function App() {
	const [marketCap, setMarketCap] = useState("");
	const [holdingPerc, setHoldingPerc] = useState("");
	const [selectedUnit, setSelectedUnit] = useState("Crore");
	const [error, setError] = useState(null);
	const [result, setResult] = useState(null);

	const units = [
		{ value: "Lakh", conversion: 0.01 },
		{ value: "Crore", conversion: 1 },
		{ value: "Billions", conversion: 100 },
		{ value: "Trillions", conversion: 100000 },
	];

	const validateInput = (value) => {
		const regex = /^[0-9]+(\.[0-9]+)?$/;
		return regex.test(value);
	};

	const calculate = () => {
		if (
			!validateInput(marketCap) ||
			!validateInput(holdingPerc) ||
			!marketCap ||
			!holdingPerc ||
			!selectedUnit
		) {
			setError("Invalid input. Please enter valid numbers.");
			return;
		}

		const marketCapNum = parseFloat(marketCap);
		const holdingPercNum = parseFloat(holdingPerc);

		// Conversion factors to convert input into Crore (base unit)
		const unitConversionToCrore = {
			Lakh: 0.01, // 1 Lakh = 0.01 Crore
			Crore: 1, // 1 Crore = 1 Crore
			Billions: 100, // 1 Billion = 100 Crore
			Trillions: 100000, // 1 Trillion = 100,000 Crore
		};

		// Convert market cap to Crore
		const marketCapInCrore = marketCapNum * unitConversionToCrore[selectedUnit];

		// Now calculate the holding value
		const calculatedValue = (marketCapInCrore * holdingPercNum) / 100;

		// Round the result to 2 decimal places
		const formattedResult = Number(calculatedValue.toFixed(2));

		setResult(`${formattedResult} Crore`); // Result is always shown in Crore
		setError(null);
	};

	return (
		<div className="max-w-md mx-auto p-4 font-bold">
			<div className="form-container space-y-4">
				<input
					type="text"
					className="text-black rounded-lg p-2 w-full"
					placeholder="Market Cap"
					value={marketCap}
					onChange={(e) => setMarketCap(e.target.value)}
				/>
				<select
					className="block py-2.5  px-0 text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
					value={selectedUnit}
					onChange={(e) => setSelectedUnit(e.target.value)}
				>
					{units.map((unit) => (
						<option key={unit.value} value={unit.value}>
							{unit.value}
						</option>
					))}
				</select>
				<input
					type="text"
					className="grid mt-5 rounded-lg p-2 w-full"
					placeholder="Holding %"
					value={holdingPerc}
					onChange={(e) => setHoldingPerc(e.target.value)}
				/>
				<button
					type="button"
					className="mt-5 text-white bg-[#050708] hover:bg-[#050708]/90 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
					onClick={calculate}
					disabled={!marketCap || !holdingPerc || !selectedUnit}
				>
					Calculate
				</button>
				{error && <p className="text-red-500">{error}</p>}
				{result && (
					<div className="result-container mt-4">
						<h2 className="text-lg">Holding value = {result}</h2>
					</div>
				)}
			</div>
			<br />
			<footer className="text-center mt-4">
				<a href="https://github.com/shrey890" target="_blank">
					&copy; shrey
				</a>
			</footer>
		</div>
	);
}

export default App;
