import React, { useState, useEffect } from "react";
import InputBox from "./components/InputBox";
import useCurrencyInfo from "./hooks/useCurrencyInfo";

function App() {
  const [amount, setAmount] = useState(1);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo || {});

  useEffect(() => {
    if (options.length > 0) {
      setIsLoading(false);
      // Auto-convert on first load
      handleConvert();
    }
  }, [options]);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
  };

  const handleConvert = () => {
    if (!currencyInfo || !currencyInfo[to]) return;
    setConvertedAmount((amount * currencyInfo[to]).toFixed(2));
  };

  return (
    <div
      className="w-full min-h-screen flex flex-col justify-center items-center bg-cover bg-center bg-no-repeat bg-fixed py-10"
      style={{
        backgroundImage: `url("https://images.pexels.com/photos/259249/pexels-photo-259249.jpeg")`,
        backgroundColor: "#f0f2f5",
      }}
    >
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold text-center">
              Currency Converter
            </h1>
            <p className="text-center text-blue-100 mt-2">
              Exchange rates updated in real-time
            </p>
          </div>

          {isLoading ? (
            <div className="p-10 flex justify-center items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="p-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleConvert();
                }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <InputBox
                    label="From"
                    amount={amount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setFrom(currency)}
                    selectedCurrency={from}
                    onAmountChange={(amount) => setAmount(amount)}
                  />
                </div>

                <div className="relative flex justify-center h-12 my-6">
                  <button
                    type="button"
                    className="absolute top-1/2 transform -translate-y-1/2 z-10 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-full p-3 shadow-lg transition-all duration-300 hover:scale-110 focus:outline-none"
                    onClick={swap}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"
                      />
                    </svg>
                  </button>
                </div>

                <div className="space-y-2">
                  <InputBox
                    label="To"
                    amount={convertedAmount}
                    currencyOptions={options}
                    onCurrencyChange={(currency) => setTo(currency)}
                    selectedCurrency={to}
                    amountDisable
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all duration-300 focus:outline-none"
                  disabled={!currencyInfo || !currencyInfo[to]}
                >
                  Convert {from.toUpperCase()} to {to.toUpperCase()}
                </button>
              </form>

              {convertedAmount > 0 && (
                <div className="mt-6 text-center text-gray-700">
                  <p className="text-lg">
                    Exchange rate: 1 {from.toUpperCase()} = {currencyInfo[to]}{" "}
                    {to.toUpperCase()}
                  </p>
                </div>
              )}
            </div>
          )}

          <div className="bg-gray-200 py-3 px-6 text-center text-gray-600 text-xs">
            Data provided by Currency API | Updated every 24h
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
