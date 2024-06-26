import { useState, useEffect } from "react";
import "../styles/SellerProductCard.css";
import SellerProductCardSkeleton from "./SellerProductCardSkeleton";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItemFromCart,
  updateQuantity,
  updateChecked,
} from "../slices/CartSlice";
import axios from "axios";

const CartCard = ({ product }) => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const initialQuantity = product.quantity;
  const [quantity, setQuantity] = useState(initialQuantity);
  const initialChecked = product.checked;
  const [isChecked, setIsChecked] = useState(initialChecked);
  const [serviceId, setServiceId] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const productInStock = useSelector((state) =>
    state.products.find((products) => products._id === product.productId)
  );

  const [showDeletePopup, setShowDeletePopup] = useState(false);

  const petInStock = useSelector((state) =>
    state.pets.find((pet) => pet._id === product.productId)
  );

  useEffect(() => {
    if (product.productId) {
      setServiceId(product.productId);
    }
  }, [product]);

  useEffect(() => {
    const loadImage = () => {
      if (product.image && product.image[0]) {
        setImage(product.image[0]);
      } else {
        console.error(
          "Product image is not defined or not in the expected format:",
          product
        );
      }
      setIsLoading(false);
    };

    loadImage();
  }, [product]);

  const handleOnRemoveClicked = async () => {
    try {
      const userId = user.userUid;
      const itemIdDeId = product._id;
      await axios.delete(
        `http://localhost:4000/api/cart/remove/${userId}/${itemIdDeId}`
      );

      if (product.type === "service") {
        await axios.post(
          `http://localhost:4000/api/services/${serviceId}/update-availability`,
          {
            date: formatISODateToYMD(product.date),
            selectedSlots: [product.slot],
            action: "remove",
          }
        );
      }

      dispatch(removeItemFromCart(product._id));
    } catch (error) {
      console.error("Error removing cart item:", error);
    } finally {
      setShowDeletePopup(false);
    }
  };

  const handleCheckboxClick = async () => {
    const newCheckedValue = !isChecked;
    setIsChecked(newCheckedValue);
    try {
      const response = await axios.put(
        `http://localhost:4000/api/cart/update/checked/${product._id}/${user.userUid}`,
        {
          checked: newCheckedValue,
        }
      );
      if (response.status === 200) {
        dispatch(
          updateChecked({
            productId: product.productId,
            checked: newCheckedValue,
          })
        );
        console.log("checkbox update successfully");
      }
    } catch (error) {
      console.log("Fail to update checkbox in cart");
    }
  };

  const handleQuantityChange = async (event) => {
    const newQuantity = parseInt(event.target.value, 10);

    if (!isNaN(newQuantity) && newQuantity > 0) {
      if (
        product.type === "product" &&
        newQuantity > productInStock.stockLevel
      ) {
        alert(
          "Cannot add more than available stock! (Only " +
            productInStock.stockLevel +
            " available)"
        );
        return; // Exit early if exceeding stock level
      } else if (
        product.type === "pet" &&
        newQuantity > petInStock.stockLevel
      ) {
        alert(
          "Cannot add more than available stock! (Only " +
            petInStock.stockLevel +
            " available)"
        );
        return; // Exit early if exceeding stock level
      } else {
        setQuantity(newQuantity);
        try {
          const response = await axios.put(
            `http://localhost:4000/api/cart/update/quantity/${product._id}/${user.userUid}`,
            {
              quantity: newQuantity,
            }
          );
          if (response.status === 200) {
            dispatch(
              updateQuantity({
                id: response.data.data._id,
                quantity: newQuantity,
              })
            );
            console.log("Successfully update the quantity of item in cart");
          }
        } catch (error) {
          console.log("Fail to update quantity in cart: " + error);
        }
      }
    } else if (event.target.value === "") {
      // Handle case when input is empty (allow deletion)
      setQuantity(""); // Assuming quantity is a string in your state
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
      newQuantity = Math.max(newQuantity - 1, 1); // Ensure the quantity doesn't go below 1
    } else if (operation === "plus") {
      newQuantity += 1;
    }

    if (product.type === "product" && newQuantity > productInStock.stockLevel) {
      alert(
        "Cannot add more than available stock! (Only " +
          productInStock.stockLevel +
          " available)"
      );
      return; // Exit early if exceeding stock level
    } else if (product.type === "pet" && newQuantity > petInStock.stockLevel) {
      alert(
        "Cannot add more than available stock! (Only " +
          petInStock.stockLevel +
          " available)"
      );
      return; // Exit early if exceeding stock level
    } else {
      setQuantity(newQuantity);
      try {
        const response = await axios.put(
          `http://localhost:4000/api/cart/update/quantity/${product._id}/${user.userUid}`,
          {
            quantity: newQuantity,
          }
        );
        if (response.status === 200) {
          // Dispatch editProduct action with updated quantity
          dispatch(
            updateQuantity({
              id: response.data.data._id,
              quantity: newQuantity,
            })
          );
          console.log("Successfully update the quantity of item in cart");
        }
      } catch (error) {
        console.log("Fail to update quantity in cart: " + error);
      }
    }
  };

  const formatSlot = (slot) => {
    const [hour] = slot.split(":").map(Number);
    const period = hour < 12 ? "AM" : "PM";
    const formattedHour = hour % 12 || 12; // Convert 24-hour to 12-hour format
    return `${formattedHour} ${period}`;
  };

  function formatISODateToYMD(isoDateString) {
    const date = new Date(isoDateString);
    const formattedDate = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getUTCDate().toString().padStart(2, "0")}`;
    return formattedDate;
  }

  return isLoading ? (
    <SellerProductCardSkeleton />
  ) : (
    <div>
      <div className="seller-product-card-container">
        <button
          className={`seller-product-card-checkbox${
            isChecked ? "-clicked" : "-unclicked"
          }`}
          onClick={handleCheckboxClick}
        >
          {isChecked ? (
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

        <div className="seller-product-card-product-name-container">
          <h4 className="seller-product-card-product-name">{product.title}</h4>
        </div>

        <div className="seller-product-card-middle-container">
          {product.type === "service" ? (
            <>
              <div className="seller-product-card-slot-container">
                <div>
                  <p className="seller-product-card-slot">
                    {formatSlot(product.slot)} &nbsp;&nbsp;
                    {formatISODateToYMD(product.date)}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="seller-product-card-quantityControlContainer">
              <button
                className="seller-product-card-minus-button"
                onClick={() => setNewQuantity("minus")}
              >
                -
              </button>
              <input
                type="number"
                className="seller-product-card-quantity-cart-input"
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
            </div>
          )}
        </div>

        <div className="seller-product-card-price-container">
          <h4 className="seller-product-card-price">RM&nbsp;{product.price}</h4>
        </div>

        <div className="seller-product-card-remove-button-container">
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
                fillRule="evenodd"
                clipRule="evenodd"
                d="M33.9062 6.62107C39.4881 11.4467 44.5208 16.8736 48.9126 22.8029C51.3405 26.0892 51.2274 30.662 48.5686 33.7774C43.7153 39.4646 38.2147 44.5656 32.1783 48.9771C28.8716 51.3938 24.3033 51.1625 21.209 48.494C15.627 43.6685 10.5943 38.2416 6.20265 32.3122C3.77469 29.0259 3.88784 24.4531 6.5466 21.3377C11.3994 15.651 16.8994 10.5506 22.9352 6.13959C24.5481 4.97248 26.5088 4.385 28.4995 4.47237C30.4902 4.55973 32.3942 5.31683 33.9029 6.62094M36.2213 19.5232C36.5419 19.869 36.7123 20.3277 36.6949 20.7985C36.6776 21.2693 36.4739 21.7136 36.1288 22.0337L30.0679 27.6543L35.6981 33.7255C36.0187 34.0713 36.1891 34.53 36.1717 35.0008C36.1544 35.4716 35.9507 35.9159 35.6056 36.2359C35.2604 36.556 34.8021 36.7256 34.3313 36.7075C33.8605 36.6894 33.4159 36.4849 33.0953 36.1392L27.4651 30.068L21.4042 35.6886C21.0591 36.0087 20.6007 36.1783 20.1299 36.1602C19.6592 36.142 19.2146 35.9376 18.894 35.5919C18.5733 35.2461 18.403 34.7874 18.4203 34.3166C18.4376 33.8458 18.6413 33.4015 18.9864 33.0815L25.0473 27.4608L19.4171 21.3896C19.0965 21.0439 18.9261 20.5851 18.9435 20.1143C18.9608 19.6435 19.1645 19.1992 19.5096 18.8792C19.8548 18.5591 20.3131 18.3895 20.7839 18.4076C21.2547 18.4258 21.6993 18.6302 22.0199 18.9759L27.6501 25.0471L33.711 19.4265C34.0561 19.1064 34.5145 18.9368 34.9853 18.9549C35.456 18.9731 35.9006 19.1775 36.2213 19.5232Z"
                fill="#FE3D00"
              />
            </svg>
          </button>
        </div>
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
            <h2>Are you sure you want to remove this item?</h2>
            <div className="forumPostDeleteButtonContainer">
              <button
                className="deleteForumPostButton"
                onClick={handleOnRemoveClicked}
              >
                Remove
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
    </div>
  );
};

export default CartCard;
