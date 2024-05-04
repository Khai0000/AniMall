import { useEffect, useState } from "react";
import "../styles/ForumHomeCard.css";
import ForumHomeCardSkeleton from "./ForumHomeCardSkeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removePost } from "../slices/postSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const ForumHomeCard = ({ post, index }) => {

  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // useEffect(() => {
  //   setIsLoading(true);
  
  //   const fetchImage = async () => {
  //     try {
  //       await axios.get(post.image[0]);
  //       setIsLoading(false);
  //     } catch (error) { 
  //       console.error("Error loading image:", error);
  //       setIsLoading(false); 
  //     }
  //   };
  
  //   fetchImage();
  // }, []);
  
  const handleOnDeleteClick = async (e) => {
    e.stopPropagation();
  
    try {
      const deletePostResponse = await axios.delete(`http://localhost:4000/api/community/post/${post._id}`);
  
      if (deletePostResponse.status === 200) {
        dispatch(removePost(post._id));
        alert('Post deleted successfully');
      } else {
        console.error('Unexpected response status:', deletePostResponse.status);
        alert('An error occurred while deleting the post. Please try again later.');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('An error occurred while deleting the post. Please try again later.');
    }
  };
  

  return isLoading ? (
    <ForumHomeCardSkeleton />
  ) : (
    <div
      className="cardContainer"
      onClick={() => {
        navigate(`post/${index}`, { state: post });
      }}
    >
      <div className="imageContainer">
        <img src={post.image[0]} alt="" />
      </div>

      <div className="cardDetails">
        <p className="title">{post.title}</p>
        <p className="author">
          By: <span className="authorDetails">{post.author}</span>
        </p>
        <p className="content">{post.content}</p>
      </div>
      {post.author === "Khai" && (
        <button
          style={{ zIndex: 100 }}
          className="deleteButton"
          onClick={(e) => {
            handleOnDeleteClick(e, post.title);
          }}
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
};

export default ForumHomeCard;
