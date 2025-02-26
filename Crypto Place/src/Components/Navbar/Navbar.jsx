import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow from "../../assets/arrow_icon.png";
import { useContext } from "react";
import { CoinContext } from "../../Context/CoinContext";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { setCurrency } = useContext(CoinContext);

  const currencyHandler = (event) => {
    switch (event.target.value) {
      case "usd":
        {
          setCurrency({ name: "usd", symbol: "$" });
        }
        break;
      case "eur":
        {
          setCurrency({ name: "eur", symbol: "Є" });
        }
        break;
      case "inr":
        {
          setCurrency({ name: "inr", symbol: "₹" });
        }
        break;

      default:
        {
          setCurrency({ name: "usd", symbol: "$" });
        }
        break;
    }
  };

  return (
    <div className="navbar">
      {/* Logo */}
      <Link to={"/"}>
        <img src={logo} className="logo" alt="" />
      </Link>

      {/* Menu */}
      <ul>
        <Link to={"/"}>
          <li>Home</li>
        </Link>

        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      {/* DropDown & Button */}
      <div className="nav-right">
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
        </select>
        <button>
          Sign Up <img src={arrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
