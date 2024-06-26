import React from "react";
import ImageSlider from "../components/ImageSlider";
import { useState} from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import { addItemToCart } from "../slices/CartSlice";
import AdvPopUp from "../components/AdvPopUp";
import AdoptFormPopUp from '../components/AdoptFormPopUp';
import axios from "axios";
import SuccessfulModal from "../../ZongMing/components/SuccessfulModal";
import PulseLoader from "react-spinners/PulseLoader";

const PetDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { petId } = useParams(); 

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showAd, setShowAd] = useState(false); // State to control the advertisement popup
  const [showForm, setShowForm] = useState(false); // State to control the advertisement popup

  const user = useSelector((state)=>state.user.user);

  const cartItem = useSelector((state) => state.cart);
  const pet = useSelector((state) =>
    state.pets.find((pet) => pet._id === petId)
  );

  if (!pet) {
    return (
      <div className="wj-loadingContainer">
          <PulseLoader size={"1.5rem"} color="#3C95A9" />
          <p className="wj-loadingText">Loading Pet Details...</p>
        </div>
    );
  }

  const handleNavigateBack = () => {
    navigate(-1); // Navigate back one step in history
  };

  const randomAdPopup = () => {
    const random = Math.floor(Math.random() * 3) + 1;
    if (random === 2) {
      setShowAd(true);
    } else {
      
    }
  }

  const handleOnAdoptButtonClick = () => {
    // const petDetails = {
    //   id: pet.id,
    //   title: pet.title,
    //   description: pet.description,
    //   image: pet.image,
    //   birthdate: pet.birthdate,
    //   animaltag: pet.animaltag,
    //   price: pet.price,
    //   stockLevel: pet.stockLevel,
    //   hidden: pet.hidden,
    //   type: "pet",
    //   quantity: 1,
    //   checked: true,
    // };
    setShowForm(true);
    console.log("Form should show"); // Check if this code block is executed
  }


  const handleOnAddToCartButtonClick = async () => {
      const existingCartItem = cartItem.find(item => item.productId === pet._id);
      if (existingCartItem && existingCartItem.quantity >= pet.stockLevel) {
        alert('Cannot add more of this item. Stock level reached.');
        return;
      }else if((existingCartItem && existingCartItem.quantity < pet.stockLevel)||!existingCartItem){
        const petDetails = [{
          productId:pet._id,
          title: pet.title,
          image: pet.image,
          price: pet.price,
          checked: true,
          quantity: 1,
          type: "pet",
        }];
        try {
            const addItemsResponse = await axios.post('http://localhost:4000/api/cart/add', {
              username: user.username,
              userId: user.userUid,
              items: petDetails,
            });
            
      
            if (addItemsResponse.status === 201) {
              randomAdPopup();
              setShowSuccessModal(true);
              dispatch(addItemToCart(petDetails));
            } else {
              alert("Add to Cart Failed. Please try again.");
            }
          } catch (error) {
            console.error("Error adding items to database:", error);
            alert("Checkout failed. Please try again.");
        }
      }
  };

  return (
    <div className="product-details-container">
      <div className="top-side-container">
        <div className="left-side">
            <ImageSlider images={pet.image} />
        </div>
        <div className="right-side">
          <p className="product-details-title">{pet.title}</p>
          <span className="product-details-description">Description: </span>
          <p className="product-details-description-content">
            {pet.description}
          </p>
          <span className="product-details-birthdate">Birth Date: </span>
          <p className="product-details-birthdate-content">{pet.birthdate}</p>
          <p className="product-details-price">Price: RM {pet.price}</p>
          <div className="product-button-container">
            <button
              className="add-to-cart-button"
              onClick={pet.price === 0 ? handleOnAdoptButtonClick : handleOnAddToCartButtonClick}
            >
              {pet.price === 0 ?
                <svg style={{ marginRight: "10%" }} width="19" height="16" viewBox="0 0 23 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M11.4995 20.4866L7.11505 15.9866L2.76505 11.4866C0.411651 8.99962 0.411651 5.10714 2.76505 2.62013C3.91741 1.51262 5.47822 0.933871 7.07405 1.02234C8.66988 1.11081 10.1572 1.85854 11.18 3.08663L11.4995 3.40013L11.816 3.07313C12.8389 1.84504 14.3262 1.09731 15.922 1.00884C17.5179 0.920371 19.0787 1.49912 20.231 2.60663C22.5844 5.09364 22.5844 8.98612 20.231 11.4731L15.881 15.9731L11.4995 20.4866Z" fill="white" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </svg> :
                <svg style={{ marginRight: "10%" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M16 16C14.89 16 14 16.89 14 18C14 18.5304 14.2107 19.0391 14.5858 19.4142C14.9609 19.7893 15.4696 20 16 20C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18C18 17.4696 17.7893 16.9609 17.4142 16.5858C17.0391 16.2107 16.5304 16 16 16ZM0 0V2H2L5.6 9.59L4.24 12.04C4.09 12.32 4 12.65 4 13C4 13.5304 4.21071 14.0391 4.58579 14.4142C4.96086 14.7893 5.46957 15 6 15H18V13H6.42C6.3537 13 6.29011 12.9737 6.24322 12.9268C6.19634 12.8799 6.17 12.8163 6.17 12.75C6.17 12.7 6.18 12.66 6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.58 16.3 9.97L19.88 3.5C19.95 3.34 20 3.17 20 3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H4.21L3.27 0M6 16C4.89 16 4 16.89 4 18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20C6.53043 20 7.03914 19.7893 7.41421 19.4142C7.78929 19.0391 8 18.5304 8 18C8 17.4696 7.78929 16.9609 7.41421 16.5858C7.03914 16.2107 6.53043 16 6 16Z" fill="white" />
                </svg>}
              {pet.price === 0 ? "Adoption" : "Add to Cart"}
            </button>

            <button onClick={handleNavigateBack} className="back-button">
              Back
            </button>
          </div>
        </div>
      </div>
      <AdoptFormPopUp show={showForm} onClose={() => { setShowForm(false) }} />
      <AdvPopUp show={showAd} onClose={() => { setShowAd(false);navigate(-1)}} />
      <SuccessfulModal show={showSuccessModal} onClose={() => setShowSuccessModal(false)} message={"The pet has been added to your cart."} />
    </div >
  );
};

export default PetDetails;

