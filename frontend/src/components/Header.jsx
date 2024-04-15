import "../styles/Header.css";
import logo from "../assets/images/logo.png";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { NavLink, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearLocalStorageAuth } from "../shuhui/helpers/handleStorage";
import { rdxLogoutUser, IRdxUser } from "../shuhui/redux/ducks/User";

function Header() {
  // const [isLogin, setIsLogin] = useState(false);

  // useEffect(() => {
  //   //set is login
  //   setIsLogin(false);
  //   //set name
  // }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutUser = () => {
    clearLocalStorageAuth();
    dispatch(rdxLogoutUser());
    navigate("/login");
  };

  const rdxUser = useSelector((state) => state);
  const rdxUserisAuth = useSelector((state) => state.isAuth);

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
        <div
          className="profile"
          style={{ display: rdxUserisAuth ? "block" : "none" }}
        >
          <PersonIcon className="profileIcon" />
          <span>Xing</span>
        </div>

        <pre>{JSON.stringify(rdxUser, null, 1)}</pre>
        {rdxUserisAuth && (
          <button
            type="button"
            onClick={logoutUser}
            style={{ display: rdxUserisAuth ? "block" : "none" }}
          >
            <LogoutIcon className="actionIcon" />
          </button>
        )}

        <NavLink
          to={"/login"}
          style={{ display: !rdxUserisAuth ? "block" : "none" }}
        >
          <AccountCircleIcon className="actionIcon" />
        </NavLink>
      </div>
      {/* <div className="actionContainer">
        {isLogin ? (
          <>
            <div className="profile">
              <PersonIcon className="profileIcon" />
              <span>Xing</span>
            </div>

            <pre>{JSON.stringify(rdxUser, null, 1)}</pre>
            {rdxUserisAuth && (
              <button type="button" onClick={logoutUser}>
                <LogoutIcon className="actionIcon" />
              </button>
            )}
          </>
        ) : (
          <NavLink to={"/login"}>
            <AccountCircleIcon className="actionIcon" />
          </NavLink>
        )}
      </div> */}
    </header>
  );
}

export default Header;
