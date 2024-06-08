import { useState, useEffect } from "react";
import "../styles/ProductCard.css";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Link } from "react-router-dom";

const PetCard = ({ pet }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length === 0) {
      return "";
    }
    return text.slice(0, maxLength);
  };

  useEffect(() => {
    setIsLoading(true);
    setImage(pet.image[0]);
    setIsLoading(false);
  }, [pet]);

  const petId = pet._id;

  return isLoading ? (
    <ProductCardSkeleton />
  ) : (
    <Link to={`/pet/${petId}`} style={{ textDecoration: "none" }}>
      <div>
        <button className="product-button">
          <div className="product-image">
            <img src={image} alt="" />
          </div>
          <div className="product-info">
            <h3 className="product-name">{truncateText(pet.title, 19)}</h3>
            <p className="product-description">
              <span>Description: </span>
              <span id="product-description-content">
                {truncateText(pet.description, 20)}
                <br />
                {truncateText(pet.description.slice(20), 20)}
              </span>
            </p>
          </div>
        </button>
      </div>
    </Link>
  );
};

export default PetCard;
