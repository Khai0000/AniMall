import React from "react";
import "../styles/OrderCard.css";
import { useState } from "react";

const SellerOrderCard=({ receipt , selectedCategory, sortedServiceReceipt})=>{
    const [showPopup, setShowPopup] = useState(false);
    // const [sortedProducts, setSortedProducts] = useState([]);

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString(undefined, options);
    };
    
    const formatTime = (timestamp) => {
        const date = new Date(timestamp);
        const options = { hour: '2-digit', minute: '2-digit' };
        return date.toLocaleTimeString(undefined, options);
    };

    const togglePopup = () => {
        setShowPopup(!showPopup); 
    };

    const parseDateTime = (dateString, timeString) => {
        const [day, month, year] = dateString.split('/').map(Number);
        const [hour, minute] = timeString.split(':').map(Number);
        return new Date(year, month - 1, day, hour, minute).getTime();
    };

    // const sortReceiptsByClosestService = (receipts) => {
    //     return receipts.sort((a, b) => {
    //         const closestToNow = (product) => {
    //             if (product.type !== "service") return Infinity;
    //             const serviceTime = parseDateTime(product.date, product.quantity);
    //             return Math.abs(serviceTime - new Date().getTime());
    //         };
    //         return closestToNow(a.products[0]) - closestToNow(b.products[0]);
    //     });
    // };

    // useEffect(() => {
    //     if (receipt) {
    //         const sorted = sortReceiptsByClosestService([receipt]); 
    //         console.log([receipt]);
    //         setSortedProducts(sorted);
    //     }
    // }, [receipt]);
    
    const checkDateStatus = (date, time) => {
        const currentTime = new Date().getTime();
        const serviceTime = new Date(parseDateTime(date,time)).getTime();
        return serviceTime > currentTime ? 'upcoming' : 'expired';
    };


    return(
        <div className="order-container">
            <div className="order-date-time-seller">
                <button onClick={togglePopup} className="user-button">{receipt.user.username}</button>
                <div>
                    <span className="order-date">{formatDate(receipt.createdAt)}</span>
                    <span className="order-time">{formatTime(receipt.createdAt)}</span>
                </div>
            </div>
            <div>
                {showPopup && (
                    <div className="user-popup">
                        <div className="user-popup-content">
                            <p>Name: {receipt.user.username}</p>
                            <p>Email: {receipt.user.email}</p>
                            <p>Phone: {receipt.user.phone}</p>  
                            <p>Address: {receipt.user.address}</p>
                            <button className="close-popup" onClick={togglePopup}>
                                Close
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <div className="order-items-container">            
                {receipt.products.map((item, index) => {
                    const dateStatus = selectedCategory.length === 1 && selectedCategory[0] === 'service' && item.type === 'service'
                    ? checkDateStatus(item.date, item.quantity)
                    : null;
                    const itemClassName = dateStatus === 'upcoming' ? 'order-item upcoming' : dateStatus === 'expired' ? 'order-item expired' : 'order-item';

                    return (
                        <div className={itemClassName} key={index}>
                            <img src={item.image} alt={item.title} className="item-image" />
                            <span className="item-name">{item.title}</span>
                            {item.type === "service" ? <span className="item-quantity-or-slot">{formatDate(item.date)}</span> : ""}
                            {item.type === "service" ? <span className="item-quantity-or-slot">{item.quantity}</span> : <span className="item-quantity-or-slot">x{item.quantity}</span>}
                            <span className="item-price">RM {item.price}</span>
                        </div>
                    );
                })}
            </div>
            <div>
                <span className="order-total-price">RM {receipt.totalPrice}</span>
            </div>
        </div>
    )
}

export default SellerOrderCard;