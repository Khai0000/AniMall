import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { login } from "../actions/auth";
import { Link } from "react-router-dom";
import "../styles/Login.css";
import DogPaw from "../assets/images/dog_paw.png";
import YellowCircle from "../assets/images/yellow_circle.png";
import AnimalPic from "../assets/images/animal_pic.png";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { isLoggedIn } = useSelector((state) => state.auth);
  const { message } = useSelector((state) => state.message);

  const validateForm = () => {
    if (!email || !password) {
      setError("Please fill in all fields.");
      return false;
    }
    return true;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      await dispatch(login(email, password));
      navigate("/product");
      window.location.reload();
    } catch (error) {
      setError("Invalid email or password.");
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/product" />;
  }

  return (
    <div className="login-pages">
      <div className="login-component">
        <div className="login-column">
          <h1 className="login-title">Login To Your Account</h1>
          <p className="login-register">
            New Customer?{" "}
            <Link className="login-register-link" to="/register">
              Register here
            </Link>
          </p>
          <form className="login-container" onSubmit={handleLogin}>
            <input
              className="login-email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="login-password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="login-reset">
              <Link className="login-reset-link" to="/reset-password">
                Forgot password?
              </Link>
            </p>
            <button className="login-button" disabled={loading} type="submit">
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>LOGIN</span>
            </button>
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}
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
};

export default Login;
