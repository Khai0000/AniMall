import React from "react";
import "../styles/OrderCard.css";

const OrderCard = ({ receipt }) => {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString(undefined, options);
  };

  console.log(receipt);

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const options = { hour: '2-digit', minute: '2-digit' };
    return date.toLocaleTimeString(undefined, options);
  };

  return (
    <div className="order-container">
      <div className="order-date-time">
        <span className="order-date">{formatDate(receipt.createdAt)}</span>
        <span className="order-time">{formatTime(receipt.createdAt)}</span>
      </div>
      <div className="order-items-container">
        {receipt.products.map((item, index) => (
          <div className="order-item" key={index}>
            <img src={item.image} alt={item.title} className="item-image" />
            <span className="item-name">{item.title}</span>
            {/* {item.type===service?<span className="item-quantity-or-slot">{item.slot}</span>:<span className="item-quantity-or-slot">{item.quantity}</span>} */}
            <span className="item-quantity-or-slot">{item.quantity}</span>
            <span className="item-price">RM {item.price}</span>
          </div>
        ))}
      </div>
      <div>
        <span className="order-total-price">Total Price: RM {receipt.totalPrice}</span>
      </div>
    </div>
  );
};

export default OrderCard;