import React, { useState, useEffect, forwardRef } from "react";
import "../styles/ServicesAppointment.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { addServiceToCart } from "../../shumin/slices/CartSlice";
import { useDispatch,useSelector } from "react-redux";
import AdvPopUp from "../../shumin/components/AdvPopUp";
import axios from 'axios';
import SuccessModal from "./SuccessfulModal.jsx";


const ServicesAppointment = ({ serviceData }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate;
  });
  const [slotsAvailability, setSlotsAvailability] = useState({});
  const [showAd, setShowAd] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const formattedDateForDB = `${selectedDate.getFullYear()}-${(selectedDate.getMonth() + 1).toString().padStart(2, "0")}-${selectedDate.getDate().toString().padStart(2, "0")}`;

  useEffect(() => {
    const fetchSlotAvailability = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/services/${serviceData._id}/update-availability/${formattedDateForDB}`);
        console.log("Slot availability response:", response.data.availability);
        setSlotsAvailability(response.data.availability);
      } catch (error) {
        console.error("Error fetching slot availability:", error);
      }
    };
    fetchSlotAvailability();
  }, [selectedDate, serviceData._id]);


  const toggleButton = (button) => {
    if (!isSlotAvailable(button)) {
      return;
    }
    const updatedButtons = selectedButtons.includes(button)
      ? selectedButtons.filter((selected) => selected !== button)
      : [...selectedButtons, button];
    setSelectedButtons(updatedButtons);
  };

  const isSlotAvailable = (slot) => {
    return slotsAvailability[slot] !== 2;
  };

  const handleBack = () => {
    navigate(-1);
  };

  const randomAdPopup = () => {
    const random = Math.floor(Math.random() * 3) + 1;
    if (random === 2) {
      setShowAd(true);
    } else {
      setShowSuccessModal(true);
    }
  }
  

  const handleAddToCart = async () => {
    if (!selectedDate) {
      alert("Please select a date before adding to cart.");
      return;
    }
    if (selectedButtons.length === 0) {
      alert("Please select a time slot before adding to cart.");
      return;
    }
    const formattedDate =
      selectedDate.getDate().toString().padStart(2, "0") + "/" +
      (selectedDate.getMonth() + 1).toString().padStart(2, "0") + "/" +
      selectedDate.getFullYear();

      const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9); // Generate a random string
      };

  
    try {
      // Update slot availability after adding to cart
      const updateResponse = await axios.post(`http://localhost:4000/api/services/${serviceData._id}/update-availability`, {
        date: formattedDateForDB,
        selectedSlots: selectedButtons,
        action: "add"
      });
      console.log("Slot availability update response:", updateResponse.data);
  
      // Fetch updated slot availability
      const fetchResponse = await axios.get(`http://localhost:4000/api/services/${serviceData._id}/update-availability/${formattedDateForDB}`);
      console.log("Updated Slot availability response:", fetchResponse.data.availability);
      setSlotsAvailability(fetchResponse.data.availability);
    } catch (error) {
      console.error("Error updating slot availability:", error);
      return;
    }
  
    selectedButtons.forEach((slot) => {
      const serviceDetails = {
        title: serviceData.serviceTitle,
        image: serviceData.serviceImages,
        price: serviceData.servicePrice,
        type: "service",
        slot: slot,
        date: formattedDate,
        id: serviceData._id,
        checked:true,
        uniqueId: generateUniqueId(),
        userId: user.id,
        quantity:1,
      };
      dispatch(addServiceToCart(serviceDetails));
      randomAdPopup();
    });
    setSelectedButtons([]);
    setShowSuccessModal(true);
  };
  



  const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref} className="customDatePickerInput" onClick={onClick}>
      {value ? value : "Select Date"}
    </div>
  ));

  const { serviceTitle, serviceDescription, servicePrice } = serviceData;
  const totalPrice =
    selectedButtons.length === 0 ? 0 : selectedButtons.length * servicePrice;

  const timeSlots = ["08:00", "09:00", "10:00", "11:00", "13:00", "14:00", "15:00", "16:00"];

  return (
    <div className="servicesAppointmentContainer">
      <div className="topContainerZM">
        <div className="appointmentTitle">
          <h1>{serviceTitle}</h1>
        </div>
        <div className="appointmentDate">
          <button
            className={`datePickerButtonZM ${selectedDate ? "dateButtonSelectedZM" : ""}`}>
            <Datepicker
              className="datePickerZM"
              selected={selectedDate}
              onChange={(date) => {
                setSelectedDate(date);
              }}
              dateFormat="dd/MM/yyyy"
              filterDate={(date) => {
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date.getTime() > today.getTime();
              }}
              customInput={<CustomDatePickerInput />}
              minDate={new Date()}
            />
          </button>
        </div>
      </div>

      <div className="middleContainerSA">
        <div className="appointmentDescriptionSA">
          <div className="descriptionContainerSA">
            <p className="descriptionWordSA">Description:</p>
            <p className="descriptionContentSA">{serviceDescription}</p>
          </div>
        </div>

        <div className="dateContainerZM">
          <div className="chooseDateZM">
            {timeSlots.map((slot) => (
              <button
                key={slot}
                className={`${selectedButtons.includes(slot) ? "selected" : ""} ${!isSlotAvailable(slot) ? "unavailable" : ""}`}
                onClick={() => toggleButton(slot)}
              >
                {parseInt(slot) < 12 ? `${slot} AM` : `${parseInt(slot) - 12}.00 PM`}

              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bottomContainerSA">
        <div className="priceSA">
          <p className="priceWordSA">Price : </p>
          <p className="priceTotalSA"> RM {totalPrice}</p>
        </div>

        <div className="cartAndBackContainerSA">
          <button className="cartBtnSA" onClick={handleAddToCart}>
            <i className="cartIconSA">
              <ShoppingCartIcon />
            </i>
            Add to Cart
          </button>
          <button className="backBtnSA" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
      <AdvPopUp show={showAd} onClose={() => { setShowAd(false);  }} />
      <SuccessModal show={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default ServicesAppointment;


