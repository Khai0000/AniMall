import SearchBar from "../components/SearchBar";
import "../styles/ProductHome.css";
import React, { useState,useEffect,lazy,Suspense,useRef} from "react";
import MyCartButton from "../components/MyCartButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import { setScrollPosition } from "../slices/ProductHistorySlice";
import EnterButtonIcon from "../components/EnterButtonIcon";
import { addPet } from "../slices/PetSlice";
import { PetData } from "../data/DummyPetData";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PetCard=lazy(()=>import("../components/PetCard"));
let num=1;

let isAdoptionFilterActive=false;

const PetHome=()=>{
    const [showPriceRange,setShowPriceRange]=useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState(''); 
    // const [productsAdded, setProductsAdded] = useState(false);

    const dispatch=useDispatch();
    const navigate = useNavigate();

    const pets = useSelector((state)=> state.pets);
    const productHistory=useSelector((state)=>state.productHistory);

    const {searchText,scrollPosition,minPriceRange,maxPriceRange,selectedProductType}=productHistory;

    const [filteredPets,setFilteredPets]=useState([]);
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
        if ( pets.length === 0) {
            PetData.forEach((pet) => {
                dispatch(addPet(pet));
            }
        );
        }
    }, [dispatch, pets]);
    
    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    const filterPets = () => {
        let filteredData = [...pets];;
        setIsLoading(true);
        if(isAdoptionFilterActive){
            filteredData = filteredData.filter((pet) => !pet.hidden);
            filteredData = filteredData.filter((pet) => pet.price==0);
        }else{
        filteredData = filteredData.filter((pet) => !pet.hidden);
        filteredData = filteredData.filter((pet) => pet.price>0);}
        
        if(searchTerm.length !== 0){
            filteredData=filteredData.filter(
                (pet)=>
                pet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pet.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if(minPrice.length!==0 && maxPrice.length===0){
            filteredData=filteredData.filter(
                (pets)=>pets.price> parseInt(minPrice)
            );
        }

        if(minPrice.length ===0 && maxPrice.length!==0){
            filteredData=filteredData.filter(
                (pets)=>pets.price< parseInt(maxPrice)
            );
        }

        if(minPrice.length !==0 && maxPrice.length!==0){
            filteredData=filteredData.filter(
                (pets)=>pets.price> parseInt(minPrice) && pets.price< parseInt(maxPrice)
            );
        }

        setIsLoading(false);
        setFilteredPets(filteredData);
    };

    // useEffect for filtering data
    useEffect(() => {
        filterPets();
    }, [searchTerm, pets, minPrice, maxPrice]); // Dependencies array


    const toggleAdoptionFilter = () => {
        if(num%2==1){
            isAdoptionFilterActive=true;
        }
        else{
            isAdoptionFilterActive=false;
        };
        num+=1;

        filterPets();
        console.log(isAdoptionFilterActive);
    };

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
        navigate(`/pet/PetCategorized/${category}`);
    };

    const handleMyCartButtonClick=()=>{
        navigate("/mycart");
    };

    const dog=filteredPets.filter(pet=>pet.animaltag=="dog");
    const cat=filteredPets.filter(pet=>pet.animaltag=="cat");
    const other=filteredPets.filter(pet=>pet.animaltag=="others");
    
    const renderPetsForCategory=(pets,category)=>(
        <div className={`Product-category-row ${category}`}>
            <div className={`Product-category-row-caption-container ${category}`}>
                <span className="Product-category-row-caption">{`${category.charAt(0).toUpperCase() + category.slice(1)}`}</span>
                <button className={`Product-category-button ${category}}`} onClick={()=>handleCategoryButtonClick(category)}>
                    <EnterButtonIcon/>
                </button>
            </div>
            {pets.length==0?
                <p className="Product-category-row-content-noproduct">{`No ${category} matched!`}</p>
                :<div className="Product-category-row-content">
                    <Suspense fallback={<div>Loading...</div>}>
                        {pets.map((pet,index)=>(
                            <PetCard key={index} pet={pet}/>
                        ))}
                    </Suspense>
                </div>}
        </div>
    );

    return (
        <div>
            <div className="Upper-section">
                <SearchBar id="Upper-section-search-bar" onSearch={handleSearch} page="pet" showPriceRange={showPriceRange} />
                {showPriceRange?(
                    <div className="Upper-section-price-range-container pet">
                        <form onSubmit={handlePriceRangeSubmit}>
                            <input
                                type="number"
                                className="Upper-section-min-price pet"
                                value={minPrice}
                                onChange={(e) => setMinPrice(e.target.value)}
                                onKeyPress={(e) => {
                                    if (e.key === 'Enter') {
                                        e.preventDefault();
                                        handlePriceRangeSubmit(e);
                                    }
                                }}
                            />
                            <span className="Upper-section-to pet">  to  </span>
                            <input
                                type="number"
                                className="Upper-section-max-price pet"
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
                ):(<button className="Upper-section-price-range-button pet" onClick={togglePriceRange}>Price Range</button>)}
                <button className={`Upper-section-adoption-button ${isAdoptionFilterActive? "selected" : ""}`} onClick={toggleAdoptionFilter}>
                    {isAdoptionFilterActive ? "✓ Adoption" : "Adoption"}
                </button>
                <MyCartButton page="pet" onClick={handleMyCartButtonClick}/>
            </div>
            <div ref={containerRef}>
                {isLoading?(
                    <div className="loadingContainer">
                        <CircularProgress className="circularProgress" />
                    </div>
                ): filteredPets.length !== 0 ? (
                    <>
                    {renderPetsForCategory(dog, 'dog')}
                    {renderPetsForCategory(cat, 'cat')}
                    {renderPetsForCategory(other, 'others')}
                    </>
                ):<div className="NoProductContainer">
                    <p>No product matched!</p>
                </div>}
            
                <Link to={`/seller/petwarehouse`} className="seller-link">
                    <button id="Seller-product">Seller</button>
                </Link>
            </div>
        </div>
    )
}

export default PetHome;

