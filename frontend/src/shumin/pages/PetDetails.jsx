import React from "react";
import ImageSlider from "../components/ImageSlider";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import {addItemToCart} from "../slices/CartSlice";
import AdvPopUp from "../components/AdvPopUp";

const PetDetails=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const { title } = useParams(); // Retrieve the service title from URL parameter

    const [imagesLoading, setImagesLoading] = useState(true);

    const [showAd, setShowAd] = useState(false); // State to control the advertisement popup


    const pet=useSelector((state)=>
        state.pets.find((pet)=>pet.title===title)
    );

    const [loadedImageUrls,setLoadedImageUrls]=useState([]);

    useEffect(()=>{
        const loadImageUrls=async()=>{
            const loadedImages=[];
            for(const image of pet.image){
                try{
                    if(image.includes("jpg")){
                        let imageDir=image.substring(0,image.indexOf("."));
                        const imageData=await import(`../assets/images/${imageDir}.jpg`);
                        loadedImages.push(imageData.default);
                    }else{
                        loadedImages.push(image);
                    }
                }catch(error){
                    console.error("Error loading image:", error);
                }
            }
            setLoadedImageUrls(loadedImages);
            setImagesLoading(false);
        };
        loadImageUrls();
    },[pet.image]);

    const handleNavigateBack = () => {
        navigate(-1); // Navigate back one step in history
    };

    // // Helper function to get a random ad number
    // const getRandomAdNumber = () => {
    // const randomNumber = Math.floor(Math.random() * 4) + 1;
    // return `adv${randomNumber}`;
    // };
  
    // // Generate a random ad number when the component mounts
    // const adNumber = getRandomAdNumber();

    const handleOnAddToCartButtonClick=()=>{
        const petDetails = {
            id: pet.id,
            title: pet.title,
            description:pet.description,
            image:pet.image,
            birthdate: pet.birthdate,
            animaltag: pet.animaltag,
            price: pet.price,
            stockLevel:pet.stockLevel,
            hidden: pet.hidden,
            type:"pet",
            quantity:1,
            checked:true,
        };
 
        dispatch(addItemToCart(petDetails));
        const random = Math.floor(Math.random() * 3) + 1;
        console.log(random);
        if(random===2){
            setShowAd(true);
            console.log("Ad should show"); // Check if this code block is executed
    } else {
        console.log("Ad will not show");
    }
    
        // navigate(-1);
// =======
        
//         dispatch(addItemToCart(petDetails));
//         navigate(-1);
// >>>>>>> origin/shumin
    }

    return (
        <div className="product-details-container">
            <div className="top-side-container">
                <div className="left-side">
                    {imagesLoading ? (
                        <p>Loading images...</p>
                    ) : (
                        <ImageSlider images={loadedImageUrls} />
                    )}
                </div>
                <div className="right-side">
                    <p className="product-details-title">{pet.title}</p>
                    <span className="product-details-description">Description: </span>
                    <p className="product-details-description-content">{pet.description}</p>
                    <span className="product-details-birthdate">Birth Date: </span>
                    <p className="product-details-birthdate-content">{pet.birthdate}</p>
                    <p className="product-details-price">Price: RM {pet.price}</p>
                    <div className="button-container">
                        <button className="add-to-cart-button" onClick={handleOnAddToCartButtonClick}>
                            Add to Cart
                        </button>
                        <button onClick={handleNavigateBack} className="back-button">Back</button>
                    </div>
                </div>
            </div>
            <AdvPopUp show={showAd} onClose={() => setShowAd(false)} /> {/* Passing props correctly */}
        </div>
    );
}

export default PetDetails;