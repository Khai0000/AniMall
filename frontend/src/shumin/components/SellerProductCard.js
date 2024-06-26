import { useState, useEffect } from "react";
import "../styles/SellerProductCard.css";
import SellerProductCardSkeleton from "./SellerProductCardSkeleton";
import { useDispatch } from "react-redux";
import {
  editProduct,
  removeProduct,
  updateQuantity,
} from "../slices/ProductSlice";
import { Link } from "react-router-dom";
import axios from "axios";
import PulseLoader from "react-spinners/PulseLoader";

const SellerProductCard = ({ product }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHidden, setIsHidden] = useState(product.hidden);
  const initialQuantity = product.stockLevel;
  const [quantity, setQuantity] = useState(initialQuantity);

  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showSuccessfulPopup, setShowSuccessfulPopup] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    setIsLoading(true);
    if (product.image && product.image[0]) {
      const imageUrl = product.image[0];
      if (imageUrl.startsWith("http://") || imageUrl.startsWith("https://")) {
        // For remote images
        setImage(imageUrl);
        setIsLoading(false);
      } else {
        // For local images
        const imageDir = imageUrl.substring(0, imageUrl.indexOf("."));
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
      console.error(
        "Product image is not defined or not in the expected format:",
        product
      );
      setIsLoading(false);
    }
  }, [product]);

  const handleOnRemoveClicked = async () => {
    setIsDeleting(true);
    try {
      const response = await axios.delete(
        `http://localhost:4000/api/product/product/${product._id}`
      );
      if (response.status === 200) {
        setShowSuccessfulPopup(true);
      } else {
        console.error("Failed to delete product:", response.data);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleCheckboxClick = async () => {
    try {
      if (!isHidden || quantity >= 1) {
        const newHiddenValue = !isHidden;
        setIsHidden(newHiddenValue);
        const response = await axios.put(
          `http://localhost:4000/api/product/product/${product._id}`,
          { hidden: newHiddenValue }
        );
        if (response.status === 200) {
          dispatch(editProduct({ id: product._id, hidden: newHiddenValue }));
        } else {
          console.error("Failed to update product hidden status:", response);
        }
      } else {
        alert(
          "Cannot make the product visible as the stock level is insufficient."
        );
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  // Automatically set isHidden to true if quantity is 0 or less
  useEffect(() => {
    async function hideProduct() {
      try {
        if (quantity <= 0 && !isHidden) {
          setIsHidden(true);

          const response = await axios.put(
            `http://localhost:4000/api/product/product/${product._id}`,
            {
              hidden: true,
            }
          );
          if (response.status === 200) {
            dispatch(editProduct({ id: product._id, hidden: true }));
          } else {
            console.error("Failed to hide product:", response);
          }
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    }
    hideProduct();
  }, [quantity, dispatch, isHidden, product._id]);

  const handleQuantityChange = async (event) => {
    try {
      if (!isNaN(event.target.value)) {
        const newQuantity = parseInt(event.target.value, 10);
        setQuantity(newQuantity);

        const response = await axios.put(
          `http://localhost:4000/api/product/product/${product._id}`,
          {
            stockLevel: newQuantity,
          }
        );
        if (response.status === 200) {
          dispatch(updateQuantity({ id: product._id, quantity: newQuantity }));
        } else {
          console.error("Failed to update product quantity:", response);
        }
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.target.blur();
    }
  };

  const setNewQuantity = async (operation) => {
    let newQuantity = quantity;
    if (operation === "minus") {
      newQuantity -= 1;
    } else if (operation === "plus") {
      newQuantity += 1;
    }
    setQuantity(newQuantity);

    try {
      const response = await axios.put(
        `http://localhost:4000/api/product/product/${product._id}`,
        { stockLevel: newQuantity }
      );
      if (response.status === 200) {
        dispatch(updateQuantity({ id: product._id, quantity: newQuantity }));
      } else {
        console.error("Failed to update product quantity:", response);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return isLoading ? (
    <SellerProductCardSkeleton />
  ) : (
    <div>
      <div className="seller-product-card-container">
        <button
          className={`seller-product-card-checkbox${
            !isHidden ? "-clicked" : "-unclicked"
          }`}
          onClick={handleCheckboxClick}
        >
          {!isHidden ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <rect
                x="0.5"
                y="-0.5"
                width="27"
                height="27"
                rx="8.5"
                transform="matrix(1 0 0 -1 0 27)"
                fill="#F3B801"
                stroke="#F3B801"
              />
              <path
                d="M23 8.57271L9.97143 21.9574L4 15.8228L5.53086 14.2501L9.97143 18.8009L21.4691 7L23 8.57271Z"
                fill="white"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              viewBox="0 0 28 28"
              fill="none"
            >
              <rect
                x="0.5"
                y="-0.5"
                width="27"
                height="27"
                rx="8.5"
                transform="matrix(1 0 0 -1 0 27)"
                fill="white"
                stroke="#3C95A9"
              />
            </svg>
          )}
        </button>
        <img src={image} alt="" className="seller-product-card-image" />
        <Link
          to={`/product/sellerProduct/add-product/${product._id}`}
          className="seller-product-card-product-name"
          style={{ textDecoration: "none" }}
        >
          <h4 className="seller-product-card-product-name-content">
            {product.title}
          </h4>
        </Link>
        <button
          className="seller-product-card-minus-button"
          onClick={() => setNewQuantity("minus")}
        >
          -
        </button>

        <input
          type="number"
          className="seller-product-card-quantity-input"
          value={quantity}
          onChange={handleQuantityChange}
          onKeyPress={handleKeyPress}
        ></input>
        <button
          className="seller-product-card-plus-button"
          onClick={() => setNewQuantity("plus")}
        >
          +
        </button>

        <h4 className="seller-product-card-price">{product.price}</h4>
        <button
          className="seller-product-card-remove-button"
          onClick={() => setShowDeletePopup(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="54"
            height="54"
            viewBox="0 0 56 56"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M33.9062 6.62107C39.4881 11.4467 44.5208 16.8736 48.9126 22.8029C51.3405 26.0892 51.2274 30.662 48.5686 33.7774C43.7153 39.4646 38.2147 44.5656 32.1783 48.9771C28.8716 51.3938 24.3033 51.1625 21.209 48.494C15.627 43.6685 10.5943 38.2416 6.20265 32.3122C3.77469 29.0259 3.88784 24.4531 6.5466 21.3377C11.3994 15.651 16.8994 10.5506 22.9352 6.13959C24.5481 4.97248 26.5088 4.385 28.4995 4.47237C30.4902 4.55973 32.3942 5.31683 33.9029 6.62094M36.2213 19.5232C36.5419 19.869 36.7123 20.3277 36.6949 20.7985C36.6776 21.2693 36.4739 21.7136 36.1288 22.0337L30.0679 27.6543L35.6981 33.7255C36.0187 34.0713 36.1891 34.53 36.1717 35.0008C36.1544 35.4716 35.9507 35.9159 35.6056 36.2359C35.2604 36.556 34.8021 36.7256 34.3313 36.7075C33.8605 36.6894 33.4159 36.4849 33.0953 36.1392L27.4651 30.068L21.4042 35.6886C21.0591 36.0087 20.6007 36.1783 20.1299 36.1602C19.6592 36.142 19.2146 35.9376 18.894 35.5919C18.5733 35.2461 18.403 34.7874 18.4203 34.3166C18.4376 33.8458 18.6413 33.4015 18.9864 33.0815L25.0473 27.4608L19.4171 21.3896C19.0965 21.0439 18.9261 20.5851 18.9435 20.1143C18.9608 19.6435 19.1645 19.1992 19.5096 18.8792C19.8548 18.5591 20.3131 18.3895 20.7839 18.4076C21.2547 18.4258 21.6993 18.6302 22.0199 18.9759L27.6501 25.0471L33.711 19.4265C34.0561 19.1064 34.5145 18.9368 34.9853 18.9549C35.456 18.9731 35.9006 19.1775 36.2213 19.5232Z"
              fill="#FE3D00"
            />
          </svg>
        </button>
      </div>
      <svg height="50" id="horizontal-line">
        <line
          x1="0"
          y1="25"
          x2="100%"
          y2="25"
          stroke="#3C95A9"
          stroke-width="1"
        />
      </svg>
      {showDeletePopup && (
        <div
          className="forumPostDeleteBackground"
          onClick={(e) => {
            setShowDeletePopup(false);
            e.stopPropagation();
          }}
        >
          <div
            className="forumPostDeleteContainer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>Are you sure you want to remove this product?</h2>
            <div className="forumPostDeleteButtonContainer">
              <button
                className="deleteForumPostButton"
                onClick={handleOnRemoveClicked}
              >
                Delete
              </button>
              <button
                className="deleteForumCloseButton"
                onClick={(e) => {
                  setShowDeletePopup(false);
                  e.stopPropagation();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleting && (
        <div className="forumPostDeleteLoadingBackground">
          <div className="forumPostDeleteLoadingContainer">
            <PulseLoader size={"1.5rem"} color="#3C95A9" />
            <p className="forumPostDeletingContainerLoadingText">Deleting...</p>
          </div>
        </div>
      )}
      {showSuccessfulPopup && (
        <div
          style={{ zIndex: 100 }}
          className="forumPostDeleteBackground"
          onClick={(e) => {
            e.stopPropagation();
            setShowSuccessfulPopup(false);
            dispatch(removeProduct(product._id));
          }}
        >
          <div
            className="forumPostDeleteContainer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>Product Removed Successfully !</h2>
            <div className="forumPostDeleteButtonContainer">
              <button
                className="deleteForumPostButton"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSuccessfulPopup(false);
                  dispatch(removeProduct(product._id));
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SellerProductCard;
