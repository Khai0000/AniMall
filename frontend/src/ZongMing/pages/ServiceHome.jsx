import React from "react";
import { Link } from "react-router-dom";
import ServiceCard from "../components/ServiceCard";
import "../styles/ServiceHome.css";
import ServicesHeader from "../components/ServicesHeader";

const CustomLink = ({ to, children }) => (
  <Link to={`/serviceDetails/${to}`} className="service-card-link">
    {children}
  </Link>
);

const ServiceHome = () => {
  const serviceData = [
    { id: 1, title: "Service 1" },
    { id: 2, title: "Service 2" },
    { id: 3, title: "Service 3" },
    { id: 4, title: "Service 4" },
    { id: 5, title: "Service 5" },
    { id: 6, title: "Service 6" },
    { id: 7, title: "Service 7" },
    // Add more service data as needed
  ];

  return (
    <div className="service-home">
      <ServicesHeader />
      <div className="service-container">
        {chunkArray(serviceData, 3).map((row, index) => (
          <div key={index} className={index % 2 === 0 ? 'odd-row' : 'even-row'}>
            {row.map((service) => (
              <CustomLink key={service.id} to={service.id}>
                <ServiceCard service={service} />
              </CustomLink>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

function chunkArray(arr, size) {
  return arr.reduce((acc, _, i) => (i % size ? acc : [...acc, arr.slice(i, i + size)]), []);
}

export default ServiceHome;
