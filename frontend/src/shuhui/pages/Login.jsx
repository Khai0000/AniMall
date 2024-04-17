import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import DogPaw from "../assets/images/dog_paw.png";
import YellowCircle from "../assets/images/yellow_circle.png";
import AnimalPic from "../assets/images/animal_pic.png";
import { useDispatch} from "react-redux";
import { setUser } from "../slices/userSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);

  const handleLoginClick = (e) => {
    e.preventDefault();
    setIsLogin(true);
    dispatch(setUser({ username: "Khai", email: "ginkhai232@bweodiq.com" }));
    navigate("/product");
  };

  return (
    <div className="login-pages">
      <div className="login-component">
        <div className="login-column">
          <h1 className="login-title">Login To Your Account</h1>
          <p className="login-register">
            New Customer?{" "}
            <Link className="login-register-link" to="/authentication/register">
              Register here
            </Link>
          </p>
          <form className="login-container" onSubmit={handleLoginClick}>
            <input className="login-email" type="email" placeholder="Email" />
            <input
              className="login-password"
              type="password"
              placeholder="Password"
            />
            <p className="login-reset">
              <Link
                className="login-reset-link"
                to="/authentication/reset-password"
              >
                Forgot password?
              </Link>
            </p>
            <button className="login-button" type="submit">
              LOGIN
            </button>
          </form>

          <img className="dog-paw" src={DogPaw} alt="dogpaw" />
        </div>
      </div>
      <div className="login-deco">
        <div className="yellow-back">
          <img
            className="yellow-circle"
            src={YellowCircle}
            alt="yellowcircle"
          />
          <img className="animal-pic" src={AnimalPic} alt="animalpic" />
        </div>
      </div>
    </div>
  );
}

export default Login;
