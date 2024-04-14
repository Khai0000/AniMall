import SearchBar from "../components/SearchBar";
import "../styles/ProductHome.css";
import React, { useState,useEffect,lazy,Suspense,useRef} from "react";
import MyCartButton from "../components/MyCartButton";
import ProductCardSkeleton from "../components/ProductCardSkeleton";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { setScrollPosition } from "../slices/ProductHistorySlice";
import EnterButtonIcon from "../components/EnterButtonIcon";
import { addProduct } from "../slices/ProductSlice";
import { ProductData } from "../data/DummyProductData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductCard=lazy(()=>import("../components/ProductCard"));

const ProductHome=()=>{
    const [showPriceRange,setShowPriceRange]=useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState(''); 
    // const [productsAdded, setProductsAdded] = useState(false);

    const dispatch=useDispatch();
    const navigate = useNavigate();

    const products = useSelector((state)=> state.products);
    const productHistory=useSelector((state)=>state.productHistory);

    const {searchText,scrollPosition,minPriceRange,maxPriceRange,selectedProductType}=productHistory;

    const [filteredProducts,setFilteredProducts]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const [searchTerm,setSearchTerm]=useState("");

    const containerRef=useRef(null);

    //useEffect for restoring last scrolling position
    useEffect(()=>{
        if(containerRef.current&& scrollPosition){
            containerRef.current.scrollTop=scrollPosition;
        }
    });

    useEffect(() => {
        if ( products.length === 0) {
            ProductData.forEach((product) => {
                dispatch(addProduct(product));
            }
        );
        }
    }, [dispatch, products]);
    
    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    //useEffect for filtering data
    useEffect(()=>{
        let filteredData = [...products];;
        setIsLoading(true);
        
        filteredData = filteredData.filter((product) => !product.hidden);

        console.log(searchTerm);
        if(searchTerm.length !== 0){
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
    }, [searchTerm, products,minPrice,maxPrice, dispatch]);

    useEffect(() => {
        const handleScroll = () => {
          if (containerRef.current) {
            dispatch(setScrollPosition(containerRef.current.scrollTop));
          }
        };
    
        const container = containerRef.current;
        container.addEventListener("scroll", handleScroll);
    
        return () => {
          container.removeEventListener("scroll", handleScroll);
        };
    }, [dispatch, containerRef]);


    const handlePriceRangeSubmit = (event) => {
        event.preventDefault(); // Prevent form submission
        setShowPriceRange(false); // Hide the price range inputs after submission
    };

    const togglePriceRange = () => {
        setShowPriceRange(!showPriceRange);
    };
    
    const handleCategoryButtonClick = (category) => {
        navigate(`/product/ProductCategorized/${category}`);
    };

    const dogProducts=filteredProducts.filter(product=>product.animaltag=="dog");
    const catProducts=filteredProducts.filter(product=>product.animaltag=="cat");
    const otherProducts=filteredProducts.filter(product=>product.animaltag=="others");
    
    const renderProductsForCategory=(products,category)=>(
        <div className={`Product-category-row ${category}`}>
            <div className={`Product-category-row-caption-container ${category}`}>
                <span className="Product-category-row-caption">{`${category.charAt(0).toUpperCase() + category.slice(1)} Products`}</span>
                <button className={`Product-category-button ${category}}`} onClick={()=>handleCategoryButtonClick(category)}>
                    <EnterButtonIcon/>
                </button>
            </div>
            {products.length==0?
                <p className="Product-category-row-content-noproduct">{`No ${category} product matched!`}</p>
                :<div className="Product-category-row-content">
                    <Suspense fallback={<div>Loading...</div>}>
                        {products.map((product,index)=>(
                            <ProductCard key={index} product={product}/>
                        ))}
                    </Suspense>
                </div>}
        </div>
    );

    return (
        <div>
            <div className="Upper-section">
                <SearchBar id="Upper-section-search-bar" onSearch={handleSearch} page="product"/>
                {showPriceRange?(
                    <div className="Upper-section-price-range-container product">
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
                            <span className="Upper-section-to">  to  </span>
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
                    </div>
                ):(<button className="Upper-section-price-range-button" onClick={togglePriceRange}>Price Range</button>)}
                <MyCartButton page="product"/>
            </div>
            <div ref={containerRef}>
                {isLoading?(
                    <div className="loadingContainer">
                        <CircularProgress className="circularProgress" />
                    </div>
                ): filteredProducts.length !== 0 ? (
                    <>
                    {renderProductsForCategory(dogProducts, 'dog')}
                    {renderProductsForCategory(catProducts, 'cat')}
                    {renderProductsForCategory(otherProducts, 'others')}
                    </>
                ):<div className="NoProductContainer">
                    <p>No product matched!</p>
                </div>}
            
                <Link to={`/seller/productwarehouse`} className="seller-link">
                    <button id="Seller-product">Seller</button>
                </Link>
            </div>
        </div>
    )
}

export default ProductHome;
