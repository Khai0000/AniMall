import { useState, useEffect } from "react";
import "../styles/ProductCard.css";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const truncateText = (text = "", maxLength) => {
    return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
  };

  useEffect(() => {
    setIsLoading(true);
    setImage(product.image[0]);
    setIsLoading(false);
  }, [product]);

  const productId = product._id;

  return isLoading ? (
    <ProductCardSkeleton />
  ) : (
    <Link to={`/product/${productId}`} style={{ textDecoration: "none" }}>
      <div>
        <button className="product-button">
          <div className="product-image">
            <img src={image} alt="" />
          </div>
          <div className="product-info">
            <h3 className="product-name">{truncateText(product.title, 19)}</h3>
            <p className="product-description">
              <span>Description: </span>
              <span id="product-description-content">
                {truncateText(product.description, 20)}
                <br />
                {truncateText(product.description.slice(20), 20)}
              </span>
            </p>
          </div>
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;
