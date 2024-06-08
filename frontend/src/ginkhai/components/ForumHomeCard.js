import { useEffect, useState } from "react";
import "../styles/ForumHomeCard.css";
import ForumHomeCardSkeleton from "./ForumHomeCardSkeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import { removePost } from "../slices/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";

const ForumHomeCard = ({ post, index }) => {
  
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showSuccessfulPopup, setShowSuccessfulPopup] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.user);
  const authorDetails = post.author.split("//useruid//");

  useEffect(() => {
    setIsLoading(true);

    if (post.image[0].startsWith("data:image/")) {
      // If the image URL starts with "data:image/", it indicates a base64 encoded image
      setIsLoading(false);
    } else if (post.image[0] === "...") {
    } else {
      // Handle other image types using existing logic
      import(`../assets/images/dog2.jpg`)
        .then((image) => {})
        .catch((error) => {
          console.error("Error loading image:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [post]);

  const handleOnDeleteClick = async (e) => {
    e.stopPropagation();
    setShowDeletePopup(false);
    setIsDeleting(true);
    try {
      const deletePostResponse = await axios.delete(
        `http://localhost:4000/api/community/post/${post._id}`
      );

      if (deletePostResponse.status === 200) {
        setShowSuccessfulPopup(true);
      } else {
        console.error("Unexpected response status:", deletePostResponse.status);
        alert(
          "An error occurred while deleting the post. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error deleting post:", error);
      alert(
        "An error occurred while deleting the post. Please try again later."
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return isLoading ? (
    <ForumHomeCardSkeleton />
  ) : (
    <div
      className="cardContainer"
      onClick={() => {
        navigate(`post/${post._id}`, { state: post });
      }}
    >
      <div className="imageContainer">
        <img src={post.image[0]} alt="" />
      </div>

      <div className="cardDetails">
        <p className="title">{post.title}</p>
        <p className="author">
          By: <span className="authorDetails">{authorDetails[0]}</span>
        </p>
        <p className="content">{post.content}</p>
      </div>
      {(authorDetails[1] && authorDetails[1] === user.userUid) ||
      (user && user.role === "admin") ? (
        <button
          style={{ zIndex: 100 }}
          className="wjDeleteButton"
          onClick={(e) => {
            setShowDeletePopup(true);
            e.stopPropagation();
          }}
        >
          <DeleteIcon />
        </button>
      ) : null}
      {showDeletePopup && (
        <div
          className="forumPostDeleteBackground"
          onClick={(e) => {
            setShowDeletePopup(false);
            e.stopPropagation();
          }}
        >
          <div
            className="forumPostDeleteContainer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>Are you sure you want to delete this post?</h2>
            <div className="forumPostDeleteButtonContainer">
              <button
                className="deleteForumPostButton"
                onClick={handleOnDeleteClick}
              >
                Delete
              </button>
              <button
                className="deleteForumCloseButton"
                onClick={(e) => {
                  setShowDeletePopup(false);
                  e.stopPropagation();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {isDeleting && (
        <div className="forumPostDeleteLoadingBackground">
          <div className="forumPostDeleteLoadingContainer">
            <PulseLoader size={"1.5rem"} color="#3C95A9" />
            <p className="forumPostDeletingContainerLoadingText">Deleting...</p>
          </div>
        </div>
      )}
      {showSuccessfulPopup && (
        <div
          style={{ zIndex: 100 }}
          className="forumPostDeleteBackground"
          onClick={(e) => {
            e.stopPropagation();
            setShowSuccessfulPopup(false);
            dispatch(removePost(post._id));
          }}
        >
          <div
            className="forumPostDeleteContainer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>Post Deleted Successfully !</h2>
            <div className="forumPostDeleteButtonContainer">
              <button
                className="deleteForumPostButton"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSuccessfulPopup(false);
                  dispatch(removePost(post._id));
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ForumHomeCard;