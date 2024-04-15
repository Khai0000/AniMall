import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { dummyServiceData } from "../ZongMing/data/dummyServiceData";
import { setInitialServices } from "../ZongMing/slices/serviceSlice";
import { Outlet } from "react-router-dom";

function Services() {
  const dispatch = useDispatch();
  const services = useSelector((state) => state.services);

  useEffect(() => {
    if (!services) {
      dispatch(setInitialServices(dummyServiceData));
    }
  });

  return <div>{services && <Outlet />}</div>;
}

export default Services;
