import "../styles/Header.css";
import logo from "../assets/images/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

function Header() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    //set is login
    setIsLogin(false);
    //set name
  }, []);

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
        {isLogin ? (
          <>
            <div className="profile">
              <PersonIcon className="profileIcon" />
              <span>123</span>
            </div>

            <LogoutIcon className="actionIcon" />
          </>
        ) : (
          <NavLink to={"/login"}>
            <AccountCircleIcon className="actionIcon" />
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;
