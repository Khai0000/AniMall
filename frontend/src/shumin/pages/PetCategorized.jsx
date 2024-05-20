import { useParams } from "react-router-dom";
import { useSelector} from "react-redux";
import SearchBar from "../components/SearchBar";
import { useState, useEffect } from "react";
import MyCartButton from "../components/MyCartButton";
import { lazy } from "react";
import "../styles/ProductCategorized.css";
import "../styles/ProductHome.css";
import CircularProgress from "@mui/material/CircularProgress";
import { useNavigate } from "react-router-dom";

const PetCard = lazy(() => import("../components/PetCard"));

const PetCategorized = () => {
  const { category } = useParams();
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAdoptionFilterActive, setIsAdoptionFilterActive] = useState(false);

  const pets = useSelector((state) => state.pets);

  const navigate = useNavigate();

  const handlePriceRangeSubmit = (event) => {
    event.preventDefault(); // Prevent form submission
    setShowPriceRange(false); // Hide the price range inputs after submission
  };

  const togglePriceRange = () => {
    setShowPriceRange(!showPriceRange);
  };

  const [filteredPets, setFilteredPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const toggleAdoptionFilter = () => {
    setIsAdoptionFilterActive(!isAdoptionFilterActive);
  };

  // useEffect for filtering data
  useEffect(() => {
    let filteredData = [...pets];
    setIsLoading(true);
    if (isAdoptionFilterActive) {
      filteredData = filteredData.filter((pet) => !pet.hidden);
      filteredData = filteredData.filter((pet) => pet.price === 0);
    } else {
      filteredData = filteredData.filter((pet) => !pet.hidden);
      filteredData = filteredData.filter((pet) => pet.price > 0);
    }
    filteredData = filteredData.filter((pet) => {
      const animalTags = pet.animaltag || [];
      const categoryExists = animalTags.includes(category);
      return categoryExists;
    });

    if (searchTerm.length !== 0) {
      filteredData = filteredData.filter(
        (pet) =>
          pet.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          pet.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice.length !== 0 && maxPrice.length === 0) {
      filteredData = filteredData.filter(
        (pets) => pets.price > parseInt(minPrice)
      );
    }

    if (minPrice.length === 0 && maxPrice.length !== 0) {
      filteredData = filteredData.filter(
        (pets) => pets.price < parseInt(maxPrice)
      );
    }

    if (minPrice.length !== 0 && maxPrice.length !== 0) {
      filteredData = filteredData.filter(
        (pets) =>
          pets.price > parseInt(minPrice) && pets.price < parseInt(maxPrice)
      );
    }

    setIsLoading(false);
    setFilteredPets(filteredData);
  }, [searchTerm, pets, minPrice, maxPrice, isAdoptionFilterActive, category]);

  function chunkArray(arr, size) {
    return arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );
  }

  const handleMyCartButtonClick = () => {
    navigate("/mycart");
  };

  return (
    <div>
      <div className="Upper-section">
        <SearchBar
          id="Upper-section-search-bar"
          onSearch={handleSearch}
          placeholder={"Search for a pet..."}
          showPriceRange={showPriceRange}
          page="pet"
        />
        {showPriceRange ? (
          <div className="Upper-section-price-range-container pet">
            <form onSubmit={handlePriceRangeSubmit}>
              <input
                type="number"
                className="Upper-section-min-price"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handlePriceRangeSubmit(e);
                  }
                }}
              />
              <span id="Upper-section-to pet"> to </span>
              <input
                type="number"
                className="Upper-section-max-price pet"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handlePriceRangeSubmit(e);
                  }
                }}
              />
            </form>
          </div>
        ) : (
          <button
            className="Upper-section-price-range-button pet"
            onClick={togglePriceRange}
          >
            Price Range
          </button>
        )}
        <button
          className={`Upper-section-adoption-button ${
            isAdoptionFilterActive ? "selected" : ""
          }`}
          onClick={toggleAdoptionFilter}
        >
          {isAdoptionFilterActive ? "✓ Adoption" : "Adoption"}
        </button>
        <MyCartButton page="pet" onClick={handleMyCartButtonClick} />
      </div>
      {isLoading ? (
        <div className="loadingContainer">
          <CircularProgress className="circularProgress" />
        </div>
      ) : filteredPets.length !== 0 ? (
        <div className="product-container">
          {chunkArray(filteredPets, 3).map((row, rowIndex) => (
            <div
              key={rowIndex}
              className={rowIndex % 2 === 0 ? "odd-row" : "even-row"}
            >
              {row.map((pet, petIndex) => (
                <PetCard key={petIndex} pet={pet} />
              ))}
            </div>
          ))}
        </div>
      ) : (
        <div className="NoProductContainer">
          <p>No pet matched!</p>
        </div>
      )}
    </div>
  );
};

export default PetCategorized;
