import { useState, useEffect } from "react";
import "../styles/ForumHomeCard.css";
import DeleteIcon from '@mui/icons-material/Delete';
import ForumHomeCardSkeleton from "./ForumHomeCardSkeleton";
import {useDispatch} from 'react-redux'
import { removePost } from "../slices/postSlice";

const ForumHomeCard = ({ post }) => {
  const dispatch = useDispatch();
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleOnDeleteClick=()=>{
    dispatch(removePost(post.title))
  }

  useEffect(() => {
    setIsLoading(true);

    if (post.image[0].includes("jpg")) {
      let imageDir = post.image[0].substring(0, post.image[0].indexOf("."));
      import(`../assets/images/${imageDir}.jpg`)
        .then((image) => {
          setImage(image.default);
        })
        .catch((error) => {
          console.error("Error loading image:", error);
          setIsLoading(false);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      console.log(post.image[0]);
      setImage(post.image[0]);
      setIsLoading(false);
    }

  }, [post]);

  return isLoading ? (
    <ForumHomeCardSkeleton />
  ) : (
    <div className="cardContainer">
      <div className="imageContainer ">
        <img src={image} alt="" />
      </div>

      <div className="cardDetails">
        <p className="title">{post.title}</p>
        <p className="author">
          By: <span className="authorDetails">{post.author}</span>
        </p>
        <p className="content">{post.content}</p>
      </div>

      {post.author==="Khai" && <button className="deleteButton" onClick={handleOnDeleteClick}>
        <DeleteIcon/>
      </button>}

    </div>
  );
};

export default ForumHomeCard;
