import React, { useId } from "react";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
  className = "",
}) {
  const amountInputId = useId();

  return (
    <div
      className={`bg-white p-5 rounded-xl border border-gray-200 shadow-md ${className}`}
    >
      <div className="text-gray-700 font-medium text-lg mb-2">{label}</div>
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor={amountInputId}
            className="text-gray-500 text-sm mb-1 block"
          >
            Amount
          </label>
          <div className="relative">
            <input
              id={amountInputId}
              className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-800 outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              type="number"
              placeholder="Enter amount"
              disabled={amountDisable}
              value={amount}
              onChange={(e) =>
                onAmountChange && onAmountChange(Number(e.target.value))
              }
            />
          </div>
        </div>
        <div className="flex-1">
          <label className="text-gray-500 text-sm mb-1 block">Currency</label>
          <select
            className="w-full bg-gray-50 border border-gray-200 rounded-lg py-3 px-4 text-gray-800 cursor-pointer outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 appearance-none"
            value={selectedCurrency}
            onChange={(e) =>
              onCurrencyChange && onCurrencyChange(e.target.value)
            }
            disabled={currencyDisable}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "right 12px center",
              paddingRight: "40px",
            }}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

export default InputBox;
