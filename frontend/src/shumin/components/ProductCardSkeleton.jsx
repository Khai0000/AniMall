import React from "react";
import "../styles/ProductCard.css";

const ProductCardSkeleton=()=>{

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
                <img alt='' className="product-image" />
                <div className="product-info">
                    <h3 className="product-name">Product title</h3>
                    <p className="product-description">
                        <span>Description: </span>
                        <span id="product-description-content">
                            {truncateText("Product description", 9)}
                            <br />
                            {truncateText("Product description".slice(9),14)}
                        </span>
                        
                    </p>
                </div>
            </button>
        </div>
    )
}

export default ProductCardSkeleton;