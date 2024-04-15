import ServiceHome from "../ZongMing/pages/ServiceHome";
import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { dummyServiceData } from "../ZongMing/data/dummyServiceData";
import { setInitialServices } from "../ZongMing/slices/serviceSlice";
import { Outlet } from "react-router-dom";

function Services() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialServices(dummyServiceData));
  });
  

  return (
    <div>
      <Outlet/>
    </div>
  );
}

export default Services;
