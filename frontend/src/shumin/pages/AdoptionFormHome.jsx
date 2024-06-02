import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormHomeCard from "../components/FormHomeCard";
import "../styles/FormHome.css";
import { useSelector } from "react-redux";
import axios from "axios";

function AdoptionFormHome() {
  const user = useSelector((state) => state.user.user);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const getFormPosts = async () => {
      try {
        const formResponse = await axios.get("http://localhost:4000/api/pet/adoption");
        if (formResponse.status === 200) {
          const posts = formResponse.data;
          if (user.role === "admin") {
            setFilteredPosts(posts); // Admin gets all posts
          } else {
            const userPosts = posts.filter(post => post.userID === user.userUid);
            setFilteredPosts(userPosts);
            if (userPosts.length > 0) {
              setUpdate(true);
            }
          }
          console.log(posts);
        } else {
          console.log(formResponse);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getFormPosts();
  }, [user.role, user.userUid]);



  const handlePostDelete = (deletedPostId) => {
    setFilteredPosts((prevPosts) =>
      prevPosts.filter((post) => post._id !== deletedPostId)
    );
  };


  return (
    <div className="formContainer">
      <div className="formBody">
        {isLoading ? (
          <div className="loadingContainer">
            <CircularProgress className="circularProgress" />
          </div>
        ) : Array.isArray(filteredPosts) && filteredPosts.length !== 0 ? (
          filteredPosts.map((form) =>
          (
            <FormHomeCard
              key={form._id}
              form={form}
              onPostDelete={handlePostDelete}
              update={update}
            />
          )
          )
        )
          : (
            <div className="formNoDiscussionContainer">
              <p>There is no adoption application.</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default AdoptionFormHome;

