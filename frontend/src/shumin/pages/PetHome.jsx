import SearchBar from "../components/SearchBar";
import "../styles/ProductHome.css";
import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import MyCartButton from "../components/MyCartButton";
import PulseLoader from "react-spinners/PulseLoader";
import { useSelector } from "react-redux";
import EnterButtonIcon from "../components/EnterButtonIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const PetCard = lazy(() => import("../components/PetCard"));

const PetHome = () => {
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isAdoptionFilterActive, setIsAdoptionFilterActive] = useState(false);

  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const pets = useSelector((state) => state.pets);
  const memoizedPets = useMemo(() => pets || [], [pets]);

  const [filteredPets, setFilteredPets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  useEffect(() => {
    let filteredData = [...memoizedPets];
    setIsLoading(true);
    if (isAdoptionFilterActive) {
      filteredData = filteredData.filter(
        (pet) => !pet.hidden && pet.price === 0
      );
    } else {
      filteredData = filteredData.filter((pet) => !pet.hidden);
      filteredData = filteredData.filter((pet) => pet.price > 0);
    }

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
  }, [searchTerm, memoizedPets, minPrice, maxPrice, isAdoptionFilterActive]);

  const toggleAdoptionFilter = () => {
    setIsAdoptionFilterActive(!isAdoptionFilterActive);
  };

  const handlePriceRangeSubmit = (event) => {
    event.preventDefault();
    setShowPriceRange(false);
  };

  const togglePriceRange = () => {
    setShowPriceRange(!showPriceRange);
  };

  const handleCategoryButtonClick = (category) => {
    navigate(`/pet/PetCategorized/${category}`);
  };

  const handleMyCartButtonClick = () => {
    navigate("/mycart");
  };

  const dog = filteredPets.filter((pet) => pet.animaltag === "dog");
  const cat = filteredPets.filter((pet) => pet.animaltag === "cat");
  const other = filteredPets.filter((pet) => pet.animaltag === "others");

  const renderPetsForCategory = (pets, category) => (
    <div className={`Product-category-row ${category}`}>
      <div className={`Product-category-row-caption-container ${category}`}>
        <span className="Product-category-row-caption">{`${
          category.charAt(0).toUpperCase() + category.slice(1)
        }`}</span>
        <button
          className={`Product-category-button ${category}}`}
          onClick={() => handleCategoryButtonClick(category)}
        >
          <EnterButtonIcon />
        </button>
      </div>
      {pets.length === 0 ? (
        <p className="Product-category-row-content-noproduct">{`No ${category} matched!`}</p>
      ) : (
        <div className="Product-category-row-content">
          <Suspense fallback={<div>Loading...</div>}>
            {pets.map((pet) => (
              <PetCard pet={pet} />
            ))}
          </Suspense>
        </div>
      )}
    </div>
  );

  return (
    <div>
      <div className="Upper-section">
        <SearchBar
          id="Upper-section-search-bar"
          onSearch={handleSearch}
          page="pet"
          placeholder={"Search for a pet..."}
          showPriceRange={showPriceRange}
        />
        {showPriceRange ? (
          <div className="Upper-section-price-range-container pet">
            <form onSubmit={handlePriceRangeSubmit}>
              <input
                type="number"
                className="Upper-section-min-price pet"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handlePriceRangeSubmit(e);
                  }
                }}
              />
              <span className="Upper-section-to pet"> to </span>
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
          {isAdoptionFilterActive ? "Adoption" : "Adoption"}
        </button>
        <MyCartButton page="pet" onClick={handleMyCartButtonClick} />
      </div>
      <div>
        {isLoading ? (
          <div className="wj-loadingContainer">
            <PulseLoader size={"1.5rem"} color="#3C95A9" />
            <p className="wj-loadingText">Loading...</p>
          </div>
        ) : filteredPets.length !== 0 ? (
          <>
            {renderPetsForCategory(dog, "dog")}
            {renderPetsForCategory(cat, "cat")}
            {renderPetsForCategory(other, "others")}
          </>
        ) : (
          <div className="NoProductContainer">
            <p>No pet matched!</p>
          </div>
        )}

        {user != null && user.role === "admin" ? 
          <div className="Seller-product">
            {isAdoptionFilterActive?
            <Link to={`/pet/adoptionformcheck`} className="seller-link">
                Adoption Form
            </Link>
            :
            <Link to={`/pet/sellerPet`} className="seller-link">
              Seller
            </Link>}
          </div>:
          <div className="Seller-product">
          {isAdoptionFilterActive?
          <Link to={`/pet/adoptionformcheck`} className="seller-link">
              My Adoption
          </Link>
          :
          ""}
        </div>
        }
      </div>
    </div>
  );
};

export default PetHome;