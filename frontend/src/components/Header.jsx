import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { removeUser } from "../shuhui/slices/userSlice";
import "../styles/Header.css";
import logo from "../assets/images/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

function Header() {
  const [isLogin, setIsLogin] = useState(false);
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLogin(user !== null);
  }, [user]);

  const handleLogout = () => {
    setIsLogin(false);
    navigate("/authentication/login", { replace: true });
    dispatch(removeUser());
  };

  const goToProfile = () => {
    navigate("/authentication/profile"); 
  };


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
        <span className="separator">|</span>
        <NavLink to={"/order"}>Order</NavLink>
      </div>

      <div className="actionContainer">
        {isLogin ? (
          <>
            <div className="profile" onClick={goToProfile}>
              <PersonIcon className="profileIcon" />
              {user && <span>{user.username}...</span>}
            </div>

            <button className="logoutButton" onClick={handleLogout}>
              <LogoutIcon className="actionIcon" />
            </button>
          </>
        ) : (
          <NavLink to={"/authentication/login"}>
            <AccountCircleIcon className="actionIcon" />
          </NavLink>
        )}
      </div>
    </header>
  );
}

export default Header;