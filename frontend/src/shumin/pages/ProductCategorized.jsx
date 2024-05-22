import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"; 
import SearchBar from "../components/SearchBar";
import { useState,useEffect } from "react";
import MyCartButton from "../components/MyCartButton";
import {lazy} from "react";
import "../styles/ProductCategorized.css";
import "../styles/ProductHome.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const ProductCard=lazy(()=>import("../components/ProductCard"));

const ProductCategorized=()=>{
    const {category} = useParams(); 
    const [showPriceRange,setShowPriceRange]=useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState(''); 
    const [searchTerm,setSearchTerm]=useState('');

    const products = useSelector((state)=> state.products);

    const dispatch=useDispatch();
    const navigate=useNavigate();

    const handlePriceRangeSubmit = (event) => {
        event.preventDefault(); // Prevent form submission
        setShowPriceRange(false); // Hide the price range inputs after submission
    };

    const togglePriceRange = () => {
        setShowPriceRange(!showPriceRange);
    };

    const [filteredProducts,setFilteredProducts]=useState([]);
    const [isLoading,setIsLoading]=useState(true);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    //useEffect for filtering data
    useEffect(()=>{
        let filteredData = [...products];
        console.log(...products);
        setIsLoading(true);
        
        filteredData = filteredData.filter((product) => {
            const animalTags = product.animaltag || [];
            const categoryExists = animalTags.includes(category);
            return categoryExists;
        });
        
        filteredData = filteredData.filter((product) => !product.hidden);

        if(searchTerm.length !==0){
            filteredData=filteredData.filter(
                (product)=>
                product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if(minPrice.length!==0 && maxPrice.length===0){
            filteredData=filteredData.filter(
                (products)=>products.price> parseInt(minPrice)
            );
        }

        if(minPrice.length ===0 && maxPrice.length!==0){
            filteredData=filteredData.filter(
                (products)=>products.price< parseInt(maxPrice)
            );
        }

        if(minPrice.length !==0 && maxPrice.length!==0){
            filteredData=filteredData.filter(
                (products)=>products.price> parseInt(minPrice) && products.price< parseInt(maxPrice)
            );
        }

        setIsLoading(false);
        setFilteredProducts(filteredData);
    }, [searchTerm, products,minPrice,maxPrice,category, dispatch]);

    function chunkArray(arr, size) {
        return arr.reduce(
          (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
          []
        );
    }

    const handleMyCartButtonClick=()=>{
        navigate("/mycart");
    };

    return(
        <div>
            <div className="Upper-section">
                <SearchBar id="Upper-section-search-bar" onSearch={handleSearch} showPriceRange={showPriceRange} placeholder={"Search for a product..."} />
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
                <MyCartButton onClick={handleMyCartButtonClick}/>
            </div>
            {isLoading?
                <div className="loadingContainer">
                    <CircularProgress className="circularProgress" />
                </div>:
                filteredProducts.length!==0?(
                    <div className="product-container">
                        {chunkArray(filteredProducts, 3).map((row, rowIndex) => (
                            <div key={rowIndex} className={rowIndex % 2 === 0 ? "odd-row" : "even-row"}>
                                {row.map((product) => (
                                    <ProductCard product={product}/>
                                ))}
                            </div>
                        ))}
                    </div>
                ):
                <div className="NoProductContainer">
                    <p>No product matched!</p>
                </div>}
        </div>
    )
}

export default ProductCategorized;