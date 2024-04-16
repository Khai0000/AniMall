import React from "react";
import ImageSlider from "../components/ImageSlider";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import "../styles/ProductDetails.css";
import {addItemToCart} from "../slices/CartSlice";

const PetDetails=()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const { title } = useParams(); // Retrieve the service title from URL parameter

    const [imagesLoading, setImagesLoading] = useState(true);

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
        navigate(-1);
    }

    return(
        <div className="product-details-container">
            <div className="top-side-container">
                <div className="left-side">
                    {imagesLoading ? (
                        <p>Loading images...</p>
                    ) : (
                    <ImageSlider images={loadedImageUrls} />)}
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
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                                <path d="M16 16C14.89 16 14 16.89 14 18C14 18.5304 14.2107 19.0391 14.5858 19.4142C14.9609 19.7893 15.4696 20 16 20C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18C18 17.4696 17.7893 16.9609 17.4142 16.5858C17.0391 16.2107 16.5304 16 16 16ZM0 0V2H2L5.6 9.59L4.24 12.04C4.09 12.32 4 12.65 4 13C4 13.5304 4.21071 14.0391 4.58579 14.4142C4.96086 14.7893 5.46957 15 6 15H18V13H6.42C6.3537 13 6.29011 12.9737 6.24322 12.9268C6.19634 12.8799 6.17 12.8163 6.17 12.75C6.17 12.7 6.18 12.66 6.2 12.63L7.1 11H14.55C15.3 11 15.96 10.58 16.3 9.97L19.88 3.5C19.95 3.34 20 3.17 20 3C20 2.73478 19.8946 2.48043 19.7071 2.29289C19.5196 2.10536 19.2652 2 19 2H4.21L3.27 0M6 16C4.89 16 4 16.89 4 18C4 18.5304 4.21071 19.0391 4.58579 19.4142C4.96086 19.7893 5.46957 20 6 20C6.53043 20 7.03914 19.7893 7.41421 19.4142C7.78929 19.0391 8 18.5304 8 18C8 17.4696 7.78929 16.9609 7.41421 16.5858C7.03914 16.2107 6.53043 16 6 16Z" fill="white"/>
                            </svg>
                            <span className="add-to-cart-button-text">Add to Cart</span>
                        </button>
                        <button onClick={handleNavigateBack} className="back-button">Back</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default PetDetails;