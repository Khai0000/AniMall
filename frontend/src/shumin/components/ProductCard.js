import { useState, useEffect } from "react";
import "../styles/ProductCard.css";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Link } from "react-router-dom";

const ProductCard = ({product})=>{
    const [image,setImage]=useState(null);
    const [isLoading,setIsLoading]=useState(false);

    const truncateText = (text, maxLength) => {
        if(text.length===0){
            return "";
        }
        return text.slice(0,maxLength);
    }
        
    useEffect(() => {
        setIsLoading(true);
    
        if (product.image && product.image[0]) {
          if (product.image[0].endsWith(".jpg")) {
            if (product.image[0].startsWith("http://") || product.image[0].startsWith("https://")) {
              // Handle remote image URLs
              setImage(product.image[0]);
              setIsLoading(false);
            } else {
              // Handle local images
              let imageDir = product.image[0].substring(0, product.image[0].indexOf("."));
              import(`../assets/images/${imageDir}.jpg`)
                .then((image) => {
                  setImage(image.default);
                })
                .catch((error) => {
                  console.error("Error loading image:", error);
                })
                .finally(() => {
                  setIsLoading(false);
                });
            }
          } else {
            console.error("Unsupported image format:", product.image[0]);
            setIsLoading(false);
          }
        } else {
          console.error("Product image is not defined or not in the expected format:", product);
          setIsLoading(false);
        }
      }, [product]);

    const productId= product._id;

    return isLoading?(
        <ProductCardSkeleton/>
    ):(
        <Link to={`/product/${productId}`} style={{ textDecoration: 'none' }}>
        <div>
            <button className="product-button">
                <div className="product-image">
                    <img src={image} alt='' />
                </div>
                <div className="product-info">
                    <h3 className="product-name">{truncateText(product.title, 19)}</h3>
                    <p className="product-description">
                        <span>Description: </span>
                        <span id="product-description-content">
                            {truncateText(product.description, 20)}
                            <br />
                            {truncateText(product.description.slice(20),20)}
                        </span>
                        
                    </p>
                </div>
            </button>
        </div>
        </Link>
    )
}

export default ProductCard;