import React from "react";
import "../styles/ProductCard.css";

const ProductCard=({ product })=>{

    // Function to truncate text to a maximum length
    const truncateText = (text, maxLength) => {
        if (text.length > maxLength && maxLength<=7) {
            return text.slice(0, maxLength);
        }else{
            return text.slice(0,maxLength)+ "...";
        }
        
    };

    return(
        <div>
            <button className="product-button">
                <img src={product.imageUrl} alt={product.name} className="product-image" />
                <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">
                        <span>Description: </span>
                        <span id="product-description-content">
                            {truncateText(product.description, 7)}
                            <br />
                            {truncateText(product.description.slice(7),12)}
                        </span>
                        
                    </p>
                </div>
            </button>
        </div>
    )
}

export default ProductCard;