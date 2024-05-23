import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setInitialServices } from "../ZongMing/slices/serviceSlice";
import { Outlet } from "react-router-dom";

function Services() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const serviceResponse = await axios.get("http://localhost:4000/api/services");
        if (serviceResponse.status === 200) {
          dispatch(setInitialServices(serviceResponse.data));
        } else {
          console.log(serviceResponse);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    !services && fetchServices();
  });

  return <Outlet />;
}

export default Services;

