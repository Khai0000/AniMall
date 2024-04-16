import { useState, useEffect } from "react";
import "../styles/ProductCard.css";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const PetCard = ({pet,index})=>{
    const [image,setImage]=useState(null);
    const [isLoading,setIsLoading]=useState(false);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const truncateText = (text, maxLength) => {
        if(text.length==0){
            return "";
        }
        if (maxLength<=9) {
            return text.slice(0, maxLength);
        }else{
            return text.slice(0,maxLength)+ "...";
        }
    }
        
    useEffect(()=>{
        setIsLoading(true);

        if(pet.image &&pet.image[0].includes("jpg")){
            let imageDir=pet.image[0].substring(0,pet.image[0].indexOf("."));
            import(`../assets/images/${imageDir}.jpg`)
                .then((image)=>{
                    setImage(image.default);
                })
                .catch((error)=>{
                    console.error("Error loading image:", error);
                })
                .finally(()=>{
                    setIsLoading(false);
                })
        } else if (pet.image && pet.image[0]) {
            setImage(pet.image[0]);
            setIsLoading(false);
        } else {
            setIsLoading(false);
        }
    },[pet]);

    return isLoading?(
        <ProductCardSkeleton/>
    ):(
        <div>
            <button className="product-button" 
                onClick={()=>{
                    navigate(`/pet/${pet.title}`,{state:pet});
            }}>
                
                <img src={image} alt='' className="product-image" />
                <div className="product-info">
                    {pet.title.length>7?
                        <h3 className="product-name">{truncateText(pet.title, 10)}</h3>
                        :<h3 className="product-name">{truncateText(pet.title, 9)}</h3>}
                    <p className="product-description">
                        <span>Description: </span>
                        <span id="product-description-content">
                            {truncateText(pet.description, 9)}
                            <br />
                            {truncateText(pet.description.slice(9),14)}
                        </span>
                    </p>
                </div>
            </button>
        </div>
    )
}

export default PetCard;