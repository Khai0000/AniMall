import "../styles/Header.css";
import logo from "../assets/images/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";

function Header() {
  return (
    <header>
      <img src={logo} alt="AniMall logo" />
      <div className="linkContainer">
        <NavLink to={"/product"}>Product</NavLink>
        <span className="separator">|</span>
        <NavLink to={"/pet"}>Pet</NavLink>
        <span className="separator">|</span>
        <NavLink to={"/community"}>Community</NavLink>
        <span className="separator">|</span>
        <NavLink to={"/services"}>Services</NavLink>
      </div>

      <div className="actionContainer">
        <AccountCircleIcon className="actionIcon" />
        <LogoutIcon className="actionIcon" />
      </div>
    </header>
  );
}

export default Header;
