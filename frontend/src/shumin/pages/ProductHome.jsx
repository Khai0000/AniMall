import SearchBar from "../components/SearchBar";
import "../styles/ProductHome.css";
import React, { useState, useEffect, lazy, Suspense, useMemo } from "react";
import MyCartButton from "../components/MyCartButton";
import CircularProgress from "@mui/material/CircularProgress";
import { useSelector, useDispatch } from "react-redux";
import EnterButtonIcon from "../components/EnterButtonIcon";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProductCard = lazy(() => import("../components/ProductCard"));

const ProductHome = () => {
  const [showPriceRange, setShowPriceRange] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const products = useSelector((state) => state.products);
  const memoizedProducts = useMemo(() => products || [], [products]);

  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
  };


  useEffect(() => {
    let filteredData = [...memoizedProducts];
    setIsLoading(true);

    filteredData = filteredData.filter((product) => !product.hidden);

    if (searchTerm.length !== 0) {
      filteredData = filteredData.filter(
        (product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (minPrice.length !== 0 && maxPrice.length === 0) {
      filteredData = filteredData.filter(
        (products) => products.price > parseInt(minPrice)
      );
    }

    if (minPrice.length === 0 && maxPrice.length !== 0) {
      filteredData = filteredData.filter(
        (products) => products.price < parseInt(maxPrice)
      );
    }

    if (minPrice.length !== 0 && maxPrice.length !== 0) {
      filteredData = filteredData.filter(
        (products) =>
          products.price > parseInt(minPrice) &&
          products.price < parseInt(maxPrice)
      );
    }

    setIsLoading(false);
    setFilteredProducts(filteredData);
  }, [searchTerm, memoizedProducts, minPrice, maxPrice, dispatch]);

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

  const handleMyCartButtonClick = () => {
    navigate("/mycart");
  };

  const dogProducts = filteredProducts.filter(
    (product) => product.animaltag === "dog"
  );
  const catProducts = filteredProducts.filter(
    (product) => product.animaltag === "cat"
  );
  const otherProducts = filteredProducts.filter(
    (product) => product.animaltag === "others"
  );

  const renderProductsForCategory = (products, category) => (
    <div className={`Product-category-row ${category}`}>
      <div className={`Product-category-row-caption-container ${category}`}>
        <span className="Product-category-row-caption">{`${
          category.charAt(0).toUpperCase() + category.slice(1)
        } Products`}</span>
        <button
          className={`Product-category-button ${category}}`}
          onClick={() => handleCategoryButtonClick(category)}
        >
          <EnterButtonIcon />
        </button>
      </div>

      {products.length === 0 ? (
        <p className="Product-category-row-content-noproduct">{`No ${category} product matched!`}</p>
      ) : (
        <div className="Product-category-row-content">
          <Suspense >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
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
          page="product"
          placeholder={"Search for a product..."}
        />
        {showPriceRange ? (
          <div className="Upper-section-price-range-container product">
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
              <span className="Upper-section-to"> to </span>
              <input
                type="number"
                className="Upper-section-max-price"
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
            className="Upper-section-price-range-button"
            onClick={togglePriceRange}
          >
            Price Range
          </button>
        )}
        <MyCartButton page="product" onClick={handleMyCartButtonClick} />
      </div>
      <div>
        {isLoading ? (
          <div className="loadingContainer">
            <CircularProgress className="circularProgress" />
          </div>
        ) : filteredProducts.length !== 0 ? (
          <>
            {renderProductsForCategory(dogProducts, "dog")}
            {renderProductsForCategory(catProducts, "cat")}
            {renderProductsForCategory(otherProducts, "others")}
          </>
        ) : (
          <div className="NoProductContainer">
           
          </div>
        )}

        {user != null && user.role === "admin" ? (
          <div className="Seller-product">
            <Link to={`/product/sellerProduct`} className="seller-link">
              Seller
            </Link>
          </div>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ProductHome;
