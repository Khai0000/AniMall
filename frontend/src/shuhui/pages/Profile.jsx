import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { updateUser, removeUser } from "../slices/userSlice";
import "../styles/Profile.css";
import profileImage from "../assets/images/dog_profile.jpg";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("Please enter your address");
  const [phone, setPhone] = useState("Please enter your phone number");
  const [usernameError, setUsernameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUsername(user.username);
    setAddress(user.address);
    setPhone(user.phone);
    setLoading(false);  
    // if (user) {
    //   // Simulate a delay to fetch user data
    //   const timer = setTimeout(() => {
    //     setUsername(user.username);
    //     setAddress(user.address);
    //     setPhone(user.phone);
    //     setLoading(false); // Stop loading once the data is set
    //   },10); // 500ms delay

    //   return () => clearTimeout(timer); // Clean up the timer
    // } else {
    //   setLoading(false);
    // }
  }, [user]);

  const validateUsername = (username) => {
    const isValidUsername = /^[a-z]+$/.test(username);
    if (!isValidUsername) {
      setUsernameError("Username can only contain lowercase letters");
    } else {
      setUsernameError("");
    }
    return isValidUsername;
  };

  const validateAddress = (address) => {
    const isValidAddress = address.trim() !== "";
    if (!isValidAddress) {
      setAddressError("Address is required");
    } else {
      setAddressError("");
    }
    return isValidAddress;
  };

  const validatePhone = (phone) => {
    const isValidPhone = /^\d{8,15}$/.test(phone);
    if (!isValidPhone) {
      setPhoneError("Please enter a valid phone number");
    } else {
      setPhoneError("");
    }
    return isValidPhone;
  };

  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername(username);
    const isAddressValid = validateAddress(address);
    const isPhoneValid = validatePhone(phone);

    if (isUsernameValid && isAddressValid && isPhoneValid) {
      try {
        const token = localStorage.getItem("token");
        await axios.put(
          "http://localhost:4000/api/auth/authentication/updateprofile",
          {
            username: username,
            email: user.email,
            address: address,
            phone: phone,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setIsEditMode(false);
        dispatch(updateUser({ username, address, phone }));
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleBackButton = () => {
    setIsEditMode(false);
    setUsername(user.username);
    setAddress(user.address);
    setPhone(user.phone);
  };

  const handleLogout = async () => {
    navigate("/authentication/login", { replace: true });
    dispatch(removeUser());
    try {
      await axios.get("http://localhost:4000/api/auth/authentication/logout", {
        withCredentials: true,
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(
        "http://localhost:4000/api/auth/authentication/delete",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 200) {
        setShowSuccessMessage(true); // Show success message
      } else {
        console.error("Error deleting user:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  if (loading) {
    return <div className="wj-loadingContainer">
      <PulseLoader size={"1.5rem"} color="#3C95A9" />
      <p className="wj-loadingText">Loading...</p>
    </div>;
  }

  if (showSuccessMessage) {
    return (
      <div className="confirm-overlay">
        <div className="confirm-dialog">
          <h2>Success!</h2>
          <p>Your account has been deleted.</p>
          <button
            onClick={() => {
              setShowConfirm(false);
              handleLogout();
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="confirm-overlay">
        <div className="confirm-dialog">
          <h2>Success!</h2>
          <p>Your account has been deleted.</p>
          <button
            onClick={() => {
              setShowConfirm(false);
              handleLogout();
            }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="profileContainer">
      <h1 className="profileName">My Profile</h1>
      <div className="profileInfo">
        <img src={profileImage} alt="Profile" className="profileImage" />
        <div className="profileDetails">
          <form>
            <div className="profileField">
              <span className="fieldName">Username :</span>
              {isEditMode ? (
                <div>
                  <input
                    className="fieldValue"
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Fill in your username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameError && (
                    <div className="error">{usernameError}</div>
                  )}
                </div>
              ) : (
                <span className="fieldValue">{username}</span>
              )}
            </div>
            <div className="profileField">
              <span className="fieldName">Email :</span>
              <span className="fieldValue">{user.email}</span>
            </div>
            <div className="profileField">
              <span className="fieldName">Address :</span>
              {isEditMode ? (
                <div>
                  <input
                    className="fieldValue"
                    type="text"
                    name="address"
                    placeholder="Please enter your address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {addressError && <div className="error">{addressError}</div>}
                </div>
              ) : (
                <span className="fieldValue">
                  {address || "Please enter your address"}
                </span>
              )}
            </div>
            <div className="profileField">
              <span className="fieldName">Phone :</span>
              {isEditMode ? (
                <div>
                  <input
                    className="fieldValue"
                    type="text"
                    name="phone"
                    placeholder="Please enter your phone number"
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      setPhoneError("");
                    }}
                  />
                  {phoneError && <div className="error">{phoneError}</div>}
                </div>
              ) : (
                <span className="fieldValue">
                  {phone || "Please enter your phone number"}
                </span>
              )}
            </div>
            <div className="buttonContainer">
              {isEditMode ? (
                <div className="editmodeButton">
                  <button className="profileButton" onClick={handleSaveChanges}>
                    Save
                  </button>
                  <button
                    className="backButton"
                    type="button"
                    onClick={handleBackButton}
                  >
                    Back
                  </button>
                </div>
              ) : (
                <div className="editmodeButton">
                  <button
                    className="profileButton"
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsEditMode(true);
                    }}
                  >
                    Edit
                  </button>

                  <button
                    className="deleteButton"
                    type="button"
                    onClick={() => setShowConfirm(true)}
                  >
                    Delete Account
                  </button>
                </div>
              )}
              {showConfirm && (
                <div className="confirm-overlay">
                  <div className="confirm-dialog">
                    <p>Are you sure you want to delete your account?</p>
                    <div className="button-container">
                      <button
                        className="confirm-button"
                        onClick={handleDeleteUser}
                      >
                        Yes
                      </button>
                      <button
                        className="confirm-button"
                        onClick={() => setShowConfirm(false)}
                      >
                        No
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
