import { useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { setInitialPost } from "../ginkhai/slices/postSlice";
import { combineData } from "../ginkhai/data/dummyData";
import {Outlet} from 'react-router-dom'

function Community() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    !posts&& dispatch(setInitialPost(combineData));
  });

  return (
    <Outlet/>
  );
}

export default Community;
