import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "../styles/Register.css";
import YellowTop from "../assets/images/yellow_top.png";
import VerifyIcon from "../assets/images/verify_icon.png";
import { register } from "../actions/auth";
import { isEmail } from "validator";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const validEmail = (value) => {
  if (!isEmail(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        This is not a valid email.
      </div>
    );
  }
};

const vusername = (value) => {
  if (value.length < 3 || value.length > 20) {
    return (
      <div className="alert alert-danger" role="alert">
        The username must be between 3 and 20 characters.
      </div>
    );
  }
};

const vpassword = (value) => {
  if (value.length < 6 || value.length > 40) {
    return (
      <div className="alert alert-danger" role="alert">
        The password must be between 6 and 40 characters.
      </div>
    );
  }
};

function Register() {
  const form = useRef();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const { message } = useSelector((state) => state.message);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    dispatch(register(username, email, password))
      .then(() => {
        setSuccessful(true);
        navigate("/login");
      })
      .catch(() => {
        setSuccessful(false);
      });
  };

  return (
    <div className="register-pages-container">
      <img className="yellow-top" src={YellowTop} alt="yellowtop" />
      <div className="register-pages">
        <div className="register-component">
          <h1 className="register-title">Create Account</h1>
          <form
            className="register-container"
            onSubmit={handleRegister}
            ref={form}
          >
            {!successful && (
              <div>
                <input
                  className="register-username"
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onBlur={() => form.current.validateAll()}
                />
                <input
                  className="register-email"
                  type="email"
                  placeholder="Email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => form.current.validateAll()}
                />
                <input
                  className="register-password"
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onBlur={() => form.current.validateAll()}
                />
                <input
                  className="register-confirmpassword"
                  type="password"
                  placeholder="Confirm Password"
                  name="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onBlur={() => form.current.validateAll()}
                />
                <button className="register-button" type="submit">
                  REGISTER
                </button>
              </div>
            )}

            {message && (
              <div className="form-group">
                <div
                  className={
                    successful ? "alert alert-success" : "alert alert-danger"
                  }
                  role="alert"
                >
                  {message}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
