import { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../Context/CoinContext";

const Home = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [dispalyCoin, setDisplayCoin] = useState([]);

  useEffect(() => {
    setDisplayCoin(allCoin);
  }, [allCoin]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest Crypto <br />
          Marketplace
        </h1>
        <p>
          Welcome to the world&apos;s largest cryptocurrency Marketplace. Sign
          Up to explore more about cryptos
        </p>
        <form>
          <input type="text" placeholder="Search Crypto" name="" id="" />
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24h Change</p>
          <p className="market-cap">Market Cap</p>
        </div>
        {dispalyCoin.slice(0, 10).map((item, index) => (
          <div className="table-layout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p
              className={
                item.price_change_percentage_24h > 0 ? "green" : "red"
              }>
              {Math.floor(item.price_change_percentage_24h * 100) / 100}
            </p>
            <p className="market-cap">
              {" "}
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

// CG-HrWdc5yp13UwUjKseeBjQ3Ga
