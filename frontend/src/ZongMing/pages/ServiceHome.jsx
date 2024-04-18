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

  useEffect(() => {
    let filteredData = allServices;

    filteredData = filteredData.filter((service) => service.hidden === false);

    filteredData = filteredData
      .filter((service) =>
        service.serviceTitle.toLowerCase().includes(searchTerm.toLowerCase())
      )


      if(minPrice.length!==0 && maxPrice.length===0){
        filteredData=filteredData.filter(
            (service)=>service.price> parseInt(minPrice)
        );
    }

    if(minPrice.length ===0 && maxPrice.length!==0){
        filteredData=filteredData.filter(
            (service)=>service.price< parseInt(maxPrice)
        );
    }

    if(minPrice.length !==0 && maxPrice.length!==0){
      filteredData=filteredData.filter(
          (service)=>service.price> parseInt(minPrice) && service.price< parseInt(maxPrice)
      );
  }
    setFilteredServices(filteredData);

  }, [searchTerm, minPrice, maxPrice, allServices])

  
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
  
  const handleBeforeUnload = () => {
    localStorage.setItem("scrollPosition", window.pageYOffset);
  };
  
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

      <div className="sellerServiceBtn">
        <Link to="/services/sellerService" className="seller-service-page-link">
          SellerService
        </Link>
      </div>
    </div>
  );

};

export default ServiceHome;
