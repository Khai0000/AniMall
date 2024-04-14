import React from "react";
import ImageSlider from "../components/ImageSlider";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import RatingChart from "../components/RatingChart";
import CommentPopUp from "../components/CommentPopUp";
import ProductPostComment from "../components/ProductPostComment";
import "../styles/ProductDetails.css";
import { addItemToCart } from "../slices/CartSlice"; 

const ProductDetails=()=>{
    const state=useLocation();
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const { title } = useParams(); // Retrieve the service title from URL parameter

    const [imagesLoading, setImagesLoading] = useState(true);

    const product=useSelector((state)=>
        state.products.find((product)=>product.title===title)
    );

    const [loadedImageUrls,setLoadedImageUrls]=useState([]);

    useEffect(()=>{
        const loadImageUrls=async()=>{
            const loadedImages=[];
            for(const image of product.image){
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
    },[product.image]);

    const [showPopup,setShowPopup]=useState(false);

    const handleAddComment=()=>{
        setShowPopup(true);
    };

    const handleNavigateBack = () => {
        navigate(-1); // Navigate back one step in history
    };

    const handleOnAddToCartButtonClick=()=>{
        const productDetails = {
            id: product.id,
            title: product.title,
            description:product.description,
            image:product.image,
            animaltag: product.animaltag,
            producttag:product.producttag,
            price: product.price,
            ratings:product.ratings,
            comments:product.comments,
            stockLevel:product.stockLevel,
            hidden: product.hidden,
            type:"product",
            quantity:1,
            checked:true,
        };
        
        dispatch(addItemToCart(productDetails));
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
                    <p className="product-details-title">{product.title}</p>
                    <span className="product-details-description">Description: </span>
                    <p className="product-details-description-content">{product.description}</p>
                    <p className="product-details-price">Price: RM {product.price}</p>
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
            <div className="feedback-container">
                <div className="rating-container">
                    <span className="rating-title">Rating</span>
                    <div className="rating-bar">
                        <RatingChart ratings={product.ratings} />
                    </div>
                </div>
                <div className="comment-container">
                    <div className="comment-header">
                        <span className="comment-title">Comment</span>
                        <button className="add-comment-button" onClick={handleAddComment}>
                            <svg className="add-comment-button-icon" xmlns="http://www.w3.org/2000/svg" width="29" height="29" viewBox="0 0 39 39" fill="none">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M8.46548 0.608655C15.7994 -0.202885 23.2006 -0.202885 30.5345 0.608655C34.5951 1.06301 37.8711 4.25534 38.3476 8.32325C39.2175 15.7491 39.2175 23.2508 38.3476 30.6766C37.8711 34.7445 34.5951 37.9369 30.5345 38.3912C23.2006 39.2029 15.7994 39.2029 8.46548 38.3912C4.40488 37.9369 1.1289 34.7445 0.652436 30.6766C-0.217479 23.2516 -0.217479 15.7506 0.652436 8.32561C0.893436 6.34933 1.7959 4.51221 3.21356 3.11198C4.63123 1.71176 6.48101 0.830494 8.46311 0.611021M19.5 7.68431C19.9715 7.68431 20.4237 7.8713 20.7571 8.20415C21.0905 8.53699 21.2778 8.98843 21.2778 9.45914V17.7251H29.5579C30.0294 17.7251 30.4816 17.9121 30.815 18.2449C31.1484 18.5778 31.3357 19.0292 31.3357 19.4999C31.3357 19.9707 31.1484 20.4221 30.815 20.7549C30.4816 21.0878 30.0294 21.2748 29.5579 21.2748H21.2778V29.5407C21.2778 30.0115 21.0905 30.4629 20.7571 30.7957C20.4237 31.1286 19.9715 31.3156 19.5 31.3156C19.0285 31.3156 18.5763 31.1286 18.2429 30.7957C17.9095 30.4629 17.7221 30.0115 17.7221 29.5407V21.2748H9.44212C8.9706 21.2748 8.5184 21.0878 8.18499 20.7549C7.85158 20.4221 7.66427 19.9707 7.66427 19.4999C7.66427 19.0292 7.85158 18.5778 8.18499 18.2449C8.5184 17.9121 8.9706 17.7251 9.44212 17.7251H17.7221V9.45914C17.7221 8.98843 17.9095 8.53699 18.2429 8.20415C18.5763 7.8713 19.0285 7.68431 19.5 7.68431Z" fill="#3C95A9"/>
                            </svg>
                        </button>
                    </div>
                    <div className="comment-body">
                        {product.comments.map((comment, index) => (
                            <ProductPostComment
                                comment={comment}
                                key={index}
                                title={title}
                            />
                        ))}
                    </div>
                    </div>
                    {showPopup && (
                        <CommentPopUp setShowPopup={setShowPopup} title={title} />
                    )}
            </div>
        </div>
    )
}

export default ProductDetails;