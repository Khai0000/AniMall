import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setInitialPost } from "../ginkhai/slices/postSlice";
import { combineData } from "../ginkhai/data/dummyData";
import { Outlet } from "react-router-dom";
import axios from "axios";

function Community() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);

  useEffect(() => {
    const getForumPosts = async () => {
      const forumPostsResponse = await axios.get(
        "http://localhost:4000/api/community"
      );
      if (forumPostsResponse.status === 200) {
        dispatch(setInitialPost(forumPostsResponse.data));
      } else {
        console.log("gg");
        console.log(forumPostsResponse);
      }
    };

    !posts && getForumPosts();

    // !posts && dispatch(setInitialPost(combineData));
  });

  return <Outlet />;
}

export default Community;
