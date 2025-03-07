/* eslint-disable react-hooks/exhaustive-deps */
import { useContext, useEffect, useState } from "react";
import "./Coin.css";
import { useParams } from "react-router-dom";
import { CoinContext } from "../../Context/CoinContext"; // Make sure the path is correct
import LineChart from "../../Components/LineChart/LineChart"; // Make sure the path is correct

const Coin = () => {
  const { coinId } = useParams();
  const [coinData, setCoinData] = useState(null); // Initialize to null
  const [historicalData, setHistoricalData] = useState(null); // Initialize to null
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currency } = useContext(CoinContext);

  const fetchCoinData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`); // Throw error for cleaner handling
      }

      const data = await response.json();
      setCoinData(data);
    } catch (err) {
      setError("Failed to fetch coin data: " + err.message);
      console.error("Failed to fetch coin data:", err);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=30&interval=daily`
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      setHistoricalData(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
      setError("Error fetching historical data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
    fetchHistoricalData();
  }, [currency, coinId]); // Add coinId if it can change

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error">
        <p>Error: {error}</p>
      </div>
    );
  }

  if (!coinData || !historicalData) {
    return <div>No data available</div>;
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData.image.large} alt={coinData.name} />{" "}
        {/* Add alt attribute */}
        <p>
          <b>
            {coinData.name} ({coinData.symbol.toUpperCase()})
          </b>
        </p>
      </div>
      <div className="coin-chart">
        <LineChart historicalData={historicalData} />
      </div>
      <div className="coin-info">
        <ul>
          <li>Crypto Market Rank</li>
          <li> {coinData.market_cap_rank} </li>
        </ul>
        <ul>
          <li>Price</li>
          <li>
            {" "}
            {currency.symbol}{" "}
            {coinData.market_data.current_price[currency.name].toLocaleString()}{" "}
          </li>
        </ul>
        <ul>
          <li>Market Cap</li>
          <li>
            {" "}
            {currency.symbol}{" "}
            {coinData.market_data.market_cap[currency.name].toLocaleString()}{" "}
          </li>
        </ul>
        <ul>
          <li>24h High</li>
          <li>
            {" "}
            {currency.symbol}{" "}
            {coinData.market_data.high_24h[currency.name].toLocaleString()}{" "}
          </li>
        </ul>
        <ul>
          <li>24h Low</li>
          <li>
            {" "}
            {currency.symbol}{" "}
            {coinData.market_data.low_24h[currency.name].toLocaleString()}{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Coin;
