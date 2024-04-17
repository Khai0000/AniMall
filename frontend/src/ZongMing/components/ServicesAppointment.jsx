import React, { useState, useEffect, forwardRef } from "react";
import "../styles/ServicesAppointment.css";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import { addServiceToCart } from "../../shumin/slices/CartSlice";
import { useDispatch } from "react-redux";

const ServicesAppointment = ({ serviceData }) => {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [selectedDate, setSelectedDate] = useState(() => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    return currentDate;
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [slotsAvailability, setSlotsAvailability] = useState({
    "8.00": 2,
    "9.00": 2,
    "10.00": 2,
    "11.00": 2,
    "13.00": 2,
    "14.00": 2,
    "15.00": 2,
    "16.00": 2,
  });

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setSelectedButtons([]);
    setSlotsAvailability({
      "8.00": 2,
      "9.00": 2,
      "10.00": 2,
      "11.00": 2,
      "13.00": 2,
      "14.00": 2,
      "15.00": 2,
      "16.00": 2,
    });
  }, [selectedDate]);

  const isSlotAvailable = (slot) => {
    return slotsAvailability[slot] > 0;
  };

  const toggleButton = (button) => {
    if (!isSlotAvailable(button)) {
      return;
    }

    const updatedButtons = [...selectedButtons];

    const index = updatedButtons.indexOf(button);
    if (index !== -1) {
      updatedButtons.splice(index, 1);
      setSlotsAvailability({
        ...slotsAvailability,
        [button]: slotsAvailability[button] + 1,
      });
    } else {
      updatedButtons.push(button);
      setSlotsAvailability({
        ...slotsAvailability,
        [button]: slotsAvailability[button] - 1,
      });
    }

    setSelectedButtons(updatedButtons);
  };

  const handleAddToCart = () => {
    if (!selectedDate) {
      alert("Please select a date before adding to cart.");
      return;
    }

    // Check if the selected date is today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (selectedDate.getTime() === today.getTime()) {
      // If today, check if any time slots are selected
      if (selectedButtons.length === 0) {
        alert("Please select a time slot before adding to cart.");
        return;
      }
    } else {
      // If not today, ensure both date and time slots are selected
      if (selectedButtons.length === 0) {
        alert("Please select a time slot before adding to cart.");
        return;
      }
    }

    selectedButtons.forEach((slot) => {
      const serviceDetails = {
        title: serviceData.serviceTitle,
        image: serviceData.serviceImages,
        price: serviceData.price,
        hidden: serviceData.hidden,
        type: "service",
        checked: true,
        slot: slot,
      };

      dispatch(addServiceToCart(serviceDetails));

      setSlotsAvailability((prevAvailability) => ({
        ...prevAvailability,
        [slot]: prevAvailability[slot] - 1,
      }));
    });

    navigate(-1);
  };

  const CustomDatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <div ref={ref} className="customDatePickerInput" onClick={onClick}>
      {value ? value : "Select Date"}
    </div>
  ));

  const { serviceTitle, description, price } = serviceData;
  const totalPrice =
    selectedButtons.length === 0 ? 0 : selectedButtons.length * price;

  return (
    <div className="servicesAppointmentContainer">
      <div className="topContainer">
        <div className="appointmentTitle">
          <h1>{serviceTitle}</h1>
        </div>
        <div className="appointmentDate">
          <button
            className={`datePickerButton ${
              selectedDate ? "dateButtonSelected" : ""
            }`}
          >
            <Datepicker
              className="datePicker"
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
            />
          </button>
        </div>
      </div>

      <div className="middleContainer">
        <div className="appointmentDescription">
          <div className="descriptionContainer">
            <p className="descriptionWord">Description:</p>
            <p className="descriptionContent">{description}</p>
          </div>
        </div>

        <div className="dateContainer">
          <div className="chooseDate">
            {Object.keys(slotsAvailability).map((slot) => (
              <button
                key={slot}
                className={`${
                  selectedButtons.includes(slot) ? "selected" : ""
                } ${!isSlotAvailable(slot) ? "unavailable" : ""}`}
                onClick={() => toggleButton(slot)}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bottomContainer">
        <div className="price">
          <p className="priceWord">Price : </p>
          <p className="priceTotal"> RM {totalPrice}</p>
        </div>

        <div className="cartAndBackContainer">
          <button className="cartBtn" onClick={handleAddToCart}>
            <i className="cartIcon">
              <ShoppingCartIcon />
            </i>
            Add to Cart
          </button>
          <button className="backBtn" onClick={handleBack}>
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesAppointment;
