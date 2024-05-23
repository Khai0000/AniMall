import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import "../styles/ServiceHome.css";
import ServicesHeader from "../components/ServicesHeader";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setInitialServices } from "../slices/serviceSlice";

const CustomLink = ({ service, children }) => {
  return (
    <Link to={`/services/${service._id}`} className="service-card-link">
      {children}
    </Link>
  );
};

const ServiceHome = () => {
  const dispatch = useDispatch();
  const allServices = useSelector((state) => state.services);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredServices, setFilteredServices] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/services");
        dispatch(setInitialServices(response.data));
        setLoading(false); // Set loading to false when data fetching is complete
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, [dispatch]);

  useEffect(() => {
    // Check if loading is true, if so, return early to prevent further execution
    if (loading) return;

    let filteredData = allServices;

    filteredData = filteredData.filter((service) => !service.serviceHide);
    filteredData = filteredData.filter((service) =>
      service.serviceTitle && service.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (minPrice !== 0 || maxPrice !== 0) {
      filteredData = filteredData.filter(
        (service) => service.servicePrice >= minPrice && service.servicePrice <= maxPrice
      );
    }

    setFilteredServices(filteredData);
  }, [loading, searchTerm, minPrice, maxPrice, allServices]);

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  const handlePriceRangeChange = (min, max) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleBeforeUnload = () => {
    localStorage.setItem("scrollPosition", window.pageYOffset);
  };

  function chunkArray(arr, size) {
    return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
  }

  return (
    <div className="service-home">
      <ServicesHeader
        onSearch={handleSearch}
        onPriceRangeChange={handlePriceRangeChange}
      />
      {loading ? ( // Render loading indicator if data is still being fetched
        <div>Loading...</div>
      ) : (
        <div className="service-container">
          {filteredServices.length === 0 ? (
            <div className="serviceNotFound">
              <p>No Service Found.</p>
            </div>
          ) : (
            chunkArray(filteredServices, 3).map((row, index) => (
              <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
                {row.map((service) => (
                  <CustomLink key={service._id} service={service}>
                    <ServiceCard
                      key={service._id}
                      service={service}
                    />
                  </CustomLink>
                ))}
              </div>
            ))
          )}
        </div>
      )}
      <div className="sellerServiceBtn">
        <Link to="/services/sellerService" className="seller-service-page-link">
          Seller
        </Link>
      </div>
    </div>
  );
};

export default ServiceHome;
