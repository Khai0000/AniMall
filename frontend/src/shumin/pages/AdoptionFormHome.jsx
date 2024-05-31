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


  useEffect(() => {
    setIsLoading(true);
    const getFormPosts = async () => {
      try {
        const formResponse = await axios.get(
          "http://localhost:4000/api/pet/adoption"
        );
        if (formResponse.status === 200) {
          setFilteredPosts(formResponse.data); // Update the local state with the fetched data
          if(user.role!=="admin"){
            if(formResponse.data.userID === user.userUid){
              setFilteredPosts(formResponse.data);
            }
          }
          console.log(formResponse.data);
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
  }, []);

  

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
          filteredPosts.map((form, index) => (
            <FormHomeCard
              form={form}
              index={index}
              key={form._id}
              onPostDelete={handlePostDelete}
            />
          ))
        ) : (
          <div className="formNoDiscussionContainer">
            <p>There is no adoption application.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdoptionFormHome;

