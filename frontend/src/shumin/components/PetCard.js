import { useState, useEffect } from "react";
import "../styles/ProductCard.css";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Link } from "react-router-dom";

const PetCard = ({pet})=>{
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
    
        if (pet.image && pet.image[0]) {
            if (pet.image[0].startsWith("http://") || pet.image[0].startsWith("https://")) {
                // Handle remote image URLs
                setImage(pet.image[0]);
                setIsLoading(false);
            } else {
                // Handle local image imports
                let imageDir = pet.image[0].substring(0, pet.image[0].indexOf("."));
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
            setIsLoading(false);
        }
    }, [pet]);
      

    const petId= pet._id;

    return isLoading?(
        <ProductCardSkeleton/>
    ):(
        <Link to={`/pet/${petId}`} style={ {textDecoration: 'none' }}>
        <div>
            <button className="product-button" >
                <div className="product-image">
                    <img src={image} alt='' />
                </div>
                <div className="product-info">
                    <h3 className="product-name">{truncateText(pet.title, 19)}</h3>
                    <p className="product-description">
                        <span>Description: </span>
                        <span id="product-description-content">
                            {truncateText(pet.description, 20)}
                            <br />
                            {truncateText(pet.description.slice(20),20)}
                        </span>
                    </p>
                </div>
            </button>
        </div>
        </Link>
    )
}

export default PetCard;