import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../slices/userSlice";
import "../styles/Profile.css";
import PersonIcon from "@mui/icons-material/Person";
import profileImage from "../assets/images/dog_profile.jpg";

function Profile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [username, setUsername] = useState(user.username);
  const [address, setAddress] = useState("Fill in your address here");
  const [phone, setPhone] = useState("Write down your phone number");
  const [usernameError, setUsernameError] = useState("");
  const [addressError, setAddressError] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [isEditMode, setIsEditMode] = useState(false);
  // const [editedUser, setEditedUser] = useState({
  //   username: user.username,
  //   email: user.email,
  //   address: "Fill in your address here",
  //   phone: "Write down your phone number",
  // });

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
    // Assuming phone number should be a string with only digits and length between 8 to 15 characters
    const isValidPhone = /^\d{8,15}$/.test(phone);
    if (!isValidPhone) {
      setPhoneError("Please enter a valid phone number");
    } else {
      setPhoneError("");
    }
    return isValidPhone;
  };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedUser((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // };

  const handleSaveChanges = (e) => {
    e.preventDefault();

    const isUsernameValid = validateUsername(username);
    const isAddressValid = validateAddress(address);
    const isPhoneValid = validatePhone(phone);

    if (isUsernameValid && isAddressValid && isPhoneValid) {
      dispatch(
        updateUser({
          username: username,
          email: user.email,
          address: address,
          phone: phone,
        })
      );
      setIsEditMode(false);
    } // Exit edit mode after saving changes
  };

  const handleBackButton = () => {
    setIsEditMode(false);
  };

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
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {usernameError && (
                    <div className="error">{usernameError}</div>
                  )}{" "}
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
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                  {addressError && <div className="error">{addressError}</div>}{" "}
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
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                  {phoneError && <div className="error">{phoneError}</div>}{" "}
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
