import { useParams } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux"; 
import SearchBar from "../components/SearchBar";
import { useState,useEffect } from "react";
import MyCartButton from "../components/MyCartButton";
import {lazy} from "react";
import "../styles/ProductCategorized.css";
import { PetData } from "../data/DummyPetData";
import { addPet } from "../slices/PetSlice";

const PetCard=lazy(()=>import("../components/PetCard"));

const PetCategorized=()=>{
    const {category} = useParams(); 
    const [showPriceRange,setShowPriceRange]=useState(false);
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState(''); 
    const [searchTerm,setSearchTerm]=useState('');


    const pets = useSelector((state)=> state.pets);
    const productHistory=useSelector((state)=>state.productHistory);

    const dispatch=useDispatch();

    const {searchText,scrollPosition,minPriceRange,maxPriceRange,selectedProductType}=productHistory;

    const handlePriceRangeSubmit = (event) => {
        event.preventDefault(); // Prevent form submission
        setShowPriceRange(false); // Hide the price range inputs after submission
    };

    const togglePriceRange = () => {
        setShowPriceRange(!showPriceRange);
    };

    const [filteredPets,setFilteredPets]=useState([]);
    const [isLoading,setIsLoading]=useState(true);

    const handleSearch = (value) => {
        setSearchTerm(value);
    };

    //useEffect for filtering data
    useEffect(()=>{
        let filteredData = [...pets];
        setIsLoading(true);
        
        filteredData = filteredData.filter((pet) => pet.animaltag == category);
        filteredData = filteredData.filter((pet) => !pet.hidden);
        filteredData = filteredData.filter((pet) => pet.price>0);

        if(searchTerm.length !==0){
            filteredData=filteredData.filter(
                (pets)=>
                pets.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                pets.description.toLowerCase().includes(searchTerm.toLowerCase())
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
    }, [searchTerm, pets,minPrice,maxPrice, dispatch]);

    useEffect(() => {
        if ( pets.length === 0) {
            PetData.forEach((pet) => {
                dispatch(addPet(pet));
            }
        );
        }
    }, [dispatch, pets]);

    function chunkArray(arr, size) {
        return arr.reduce(
          (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
          []
        );
    }

    return(
        <div>
            <div className="Upper-section">
                <SearchBar id="Upper-section-search-bar" onSearch={handleSearch} showPriceRange={showPriceRange} />
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
            <div className="product-container">
                {chunkArray(filteredPets, 3).map((row, rowIndex) => (
                    <div key={rowIndex} className={rowIndex % 2 === 0 ? "odd-row" : "even-row"}>
                        {row.map((pet, petIndex) => (
                            <PetCard key={petIndex} pet={pet}/>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PetCategorized;