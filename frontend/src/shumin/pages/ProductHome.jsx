import SearchBar from "../components/SearchBar";
import "../styles/ProductHome.css";
import React, { useState } from "react";
import MyCartButton from "../components/MyCartButton";
import ProductCard from "../components/ProductCard";
import { NavLink } from "react-router-dom";

const ProductHome=()=>{
    const [showPriceRange,setShowPriceRange]=useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const Product={
        imageUrl:"https://th.bing.com/th/id/OIP.9WasPpl84we8tW8rErJWrQHaHa?rs=1&pid=ImgDetMain",
        name:"Dog 1",
        description:"Cute, 2 months old"
    }

    const handlePriceRangeSubmit = (event) => {
        event.preventDefault(); // Prevent form submission
        // Perform actions with minPrice and maxPrice values, such as filtering product
        console.log('Min Price:', minPrice);
        console.log('Max Price:', maxPrice);
        setShowPriceRange(false); // Hide the price range inputs after submission
      };

    const togglePriceRange = () => {
        setShowPriceRange(!showPriceRange);
    };

    return (
        <div>
            <div className="Upper-section">
                <SearchBar id="Upper-section-search-bar" showPriceRange={showPriceRange} />
                {showPriceRange?(
                    <form onSubmit={handlePriceRangeSubmit}>
                        <input
                            type="number"
                            className="Upper-section-min-price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handlePriceRangeSubmit(e);
                                }
                            }}
                        />
                        <span id="Upper-section-to">  to  </span>
                        <input
                            type="number"
                            className="Upper-section-max-price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    handlePriceRangeSubmit(e);
                                }
                            }}
                        />
                    </form>
                ):(<button className="Upper-section-price-range-button" onClick={togglePriceRange}>Price Range</button>)}
                <MyCartButton/>
            </div>
            <ProductCard product={Product}/>
            <NavLink to="/SellerProduct" className="seller-link">
                <button id="Seller-product">Seller</button>
            </NavLink>
        </div>
    )
}

export default ProductHome;

