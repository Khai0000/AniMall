import { useState, useEffect } from "react";
import "../styles/ProductCard.css";
import ProductCardSkeleton from "./ProductCardSkeleton";
import { Link } from "react-router-dom";

const ProductCard = ({product,index})=>{
    const [image,setImage]=useState(null);
    const [isLoading,setIsLoading]=useState(false);

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

        if(product.image &&product.image[0].includes("jpg")){
            let imageDir=product.image[0].substring(0,product.image[0].indexOf("."));
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
        } else if (product.image && product.image[0]) {
            console.log(product.image[0]);
            setImage(product.image[0]);
            setIsLoading(false);
        } else {
            // Handle the case where product.image is not as expected
            console.error("Product image is not defined or not in the expected format:", product);
            setIsLoading(false);
        }
    },[product]);

    return isLoading?(
        <ProductCardSkeleton/>
    ):(
        <Link to={`/product/${product.title}`} style={{ textDecoration: 'none' }}>
        <div>
            <button className="product-button">
                <img src={image} alt='' className="product-image" />
                <div className="product-info">
                    {product.title.length>7?
                        <h3 className="product-name">{truncateText(product.title, 10)}</h3>
                        :<h3 className="product-name">{truncateText(product.title, 9)}</h3>}
                    <p className="product-description">
                        <span>Description: </span>
                        <span id="product-description-content">
                            {truncateText(product.description, 9)}
                            <br />
                            {truncateText(product.description.slice(9),14)}
                        </span>
                        
                    </p>
                </div>
            </button>
        </div>
        </Link>
    )
}

export default ProductCard;