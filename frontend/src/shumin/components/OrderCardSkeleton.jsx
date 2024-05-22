import React from "react";
import "../styles/OrderCard.css";

const OrderCardSkeleton=()=>{

    return(
        <div className="order-container">
            <div className="order-date-time">
                <span className="order-date">Date</span>
                <span className="order-time">Time</span>
            </div>
            <div className="order-items-container">
                <div className="order-item">
                    <img alt='' className="item-image" />
                    <span className="item-name">Product/Service</span>
                    <span className="item-quantity-or-slot">Quantity/Slot</span>
                    <span className="item-price">Price</span>
                </div>
            </div>
            <div>
                <span className="order-total-price">Total price</span>
            </div>
        </div>
    )
}

export default OrderCardSkeleton;