import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrow from "../../assets/arrow_icon.png";

const Navbar = () => {
  return (
    <div className="navbar">
      {/* Logo */}
      <img src={logo} className="logo" alt="" />
      {/* Menu */}
      <ul>
        <li>Home</li>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      {/* DropDown & Button */}
      <div className="nav-right">
        <select>
          <option value="usd">USD</option>
          <option value="eur">EUR</option>
          <option value="inr">INR</option>
          <option value="mad">MAD</option>
        </select>
        <button>
          Sign Up <img src={arrow} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Navbar;
