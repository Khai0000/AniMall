import ServiceHome from "../ZongMing/pages/ServiceHome";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { dummyServiceData } from "../ZongMing/data/dummyServiceData";
import { setInitialPost } from "../ZongMing/slices/serviceSlice";

function Services() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialPost(dummyServiceData));
  }, [dispatch]);
  

  return (
    <div>
      <ServiceHome />
    </div>
  );
}

export default Services;
