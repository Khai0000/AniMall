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
  const [slotsAvailability, setSlotsAvailability] = useState("");

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    setSelectedButtons([]);
    setSlotsAvailability({
      "8.00": 0,
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
  
   
      if (selectedButtons.length === 0) {
        alert("Please select a time slot before adding to cart.");
        return;
      }
    
      const formattedDate =
    selectedDate.getDate().toString().padStart(2, "0") + "/" +
    (selectedDate.getMonth() + 1).toString().padStart(2, "0") + "/" +
    selectedDate.getFullYear();
  
  
    selectedButtons.forEach((slot) => {
      const serviceDetails = {
        title: serviceData.serviceTitle,
        image: serviceData.serviceImages,
        price: serviceData.price,
        hidden: serviceData.hidden,
        type: "service",
        checked: true,
        slot: slot,
        date: formattedDate,
      };
  
      dispatch(addServiceToCart(serviceDetails));
  
    });
  
    setSelectedButtons([]);
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
      <div className="topContainerZM">
        <div className="appointmentTitle">
          <h1>{serviceTitle}</h1>
        </div>
        <div className="appointmentDate">
          <button
            className={`datePickerButtonZM ${
              selectedDate ? "dateButtonSelectedZM" : ""
            }`}
          >
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
              // Set minDate to disable dates earlier than today
              minDate={new Date()}
            />
          </button>
        </div>
      </div>

      <div className="middleContainerSA">
        <div className="appointmentDescriptionSA">
          <div className="descriptionContainerSA">
            <p className="descriptionWordSA">Description:</p>
            <p className="descriptionContentSA">{description}</p>
          </div>
        </div>

        <div className="dateContainerZM">
          <div className="chooseDateZM">
            {Object.keys(slotsAvailability).map((slot) => (
              <button
                key={slot}
                className={`${
                  selectedButtons.includes(slot) ? "selected" : ""
                } ${!isSlotAvailable(slot) ? "unavailable" : ""}`}
                onClick={() => toggleButton(slot)}
              >
                {slot<12?slot:slot-12+".00"}{slot< 12 ?"AM":"PM"}
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
    </div>
  );
};

export default ServicesAppointment;
