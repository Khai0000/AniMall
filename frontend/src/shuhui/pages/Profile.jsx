import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../slices/userSlice";
import "../styles/Profile.css";
import profileImage from "../assets/images/dog_profile.jpg";
import axios from "axios";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token"); // Ensure your token is stored in localStorage
        const response = await axios.get(
          "http://localhost:4000/api/auth/authentication/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const userData = response.data;
        console.log(userData);

        setUsername(userData.username);
        setAddress(userData.address);
        setPhone(userData.phone);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

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
        const token = localStorage.getItem("token"); // Ensure your token is stored in localStorage
        const response = await axios.put(
          "http://localhost:4000/api/auth/authentication/profile",
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

        console.log(response.data);
        setIsEditMode(false);
        dispatch(updateUser({ username, address, phone }));
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleBackButton = () => {
    setIsEditMode(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profileContainer">
      <h1 className="profileName">My Profile</h1>
      <div className="profileInfo">
        <img src={profileImage} alt="Profile" className="profileImage" />
        <div className="profileDetails">
          <form onSubmit={handleSaveChanges}>
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
                    placeholder="Fill in your address here"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {addressError && <div className="error">{addressError}</div>}
                </div>
              ) : (
                <span className="fieldValue">{address}</span>
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
                    placeholder="Write down your phone number"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {phoneError && <div className="error">{phoneError}</div>}
                </div>
              ) : (
                <span className="fieldValue">{phone}</span>
              )}
            </div>
            <div className="buttonContainer">
              {isEditMode ? (
                <div className="editmodeButton">
                  <button className="profileButton" type="submit">
                    Save
                  </button>
                  <button className="backButton" onClick={handleBackButton}>
                    Back
                  </button>
                </div>
              ) : (
                <button
                  className="profileButton"
                  onClick={() => setIsEditMode(true)}
                >
                  Edit
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
