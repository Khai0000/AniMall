import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import "../styles/ServiceHome.css";
import ServicesHeader from "../components/ServicesHeader";
import { useSelector } from "react-redux";

const CustomLink = ({ to, serviceTitle, children }) => (
  <Link to={`/services/serviceDetails/${encodeURIComponent(serviceTitle)}`} className="service-card-link">
    {children}
  </Link>
);

const ServiceHome = () => {
  const allServices = useSelector((state) => state.services);
  const [searchTerm, setSearchTerm] = useState(""); // State to store the search term
  const [filteredServices, setFilteredServices] = useState([]); // State to store the filtered services
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);

  // Retrieve services from Redux store
  useEffect(() => {
    console.log('All services:', allServices);

    if (!Array.isArray(allServices)) {
      console.error('All services is not an array:', allServices);
      return;
    }
    // Filter services based on the search term
    const filtered = allServices
      .filter((service) =>
        service.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(
        (service) => service.price >= minPrice && service.price <= maxPrice
      );
    setFilteredServices(filtered);
  }, [searchTerm, minPrice, maxPrice]);

  const handleBeforeUnload = () => {
    localStorage.setItem("scrollPosition", window.pageYOffset);
  };

  // Event handler for handling search input changes
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

  function chunkArray(arr, size) {
    return arr.reduce(
      (acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]),
      []
    );
  }

  return (
    <div className="service-home">
      <ServicesHeader
        onSearch={handleSearch}
        onPriceRangeChange={handlePriceRangeChange}
      />
      <div className="service-container">
        {filteredServices.length === 0 ? (
          <div className="serviceNotFound">
            <p>No Service Found.</p>
          </div>
        ) : (
          chunkArray(filteredServices, 3).map((row, index) => (
            <div key={index} className={index % 2 === 0 ? "odd-row" : "even-row"}>
              {row.map((service) => (
                <CustomLink key={service.serviceTitle} to={service.serviceTitle} serviceTitle={service.serviceTitle}>
                  <ServiceCard
                    key={service.serviceTitle}
                    title={service.serviceTitle}
                    image={service.serviceImages[0]}
                    description={service.description}
                  />
                </CustomLink>
              ))}
            </div>
          ))
        )}
      </div>

      {filteredServices.length > 0 && filteredServices.every(service => service.price < minPrice || service.price > maxPrice)}

      <Link to="/services/sellerService" className="seller-service-page-link">Seller Service</Link>
    </div>
  );

};

export default ServiceHome;
