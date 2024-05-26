import "../styles/ForumPostDetails.css";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import IconButton from "@mui/material/IconButton";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopupDialog from "../components/PopupDialog";
import ForumPostComment from "../components/ForumPostComment";
import { useSelector, useDispatch } from "react-redux";
import {
  removeDislike,
  removeLike,
  addDislike,
  addLike,
} from "../slices/postSlice";
import ImageSlider from "../components/ImageSlider";
import PulseLoader from "react-spinners/PulseLoader";
import { NotFoundPages } from "../../pages";
import axios from "axios";

const ForumPostDetails = () => {
  const { postId } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [showErrorPage, setShowErrorPage] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loadedImageUrls, setLoadedImageUrls] = useState([]);
  const [disableButton, setDisableButton] = useState(false);

  const user = useSelector((state)=> state.user.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const localPost = useSelector((state) =>
    state.posts?.find((post) => {
      return post._id === postId;
    })
  );

  const postRef = useRef(localPost); 
  postRef.current=localPost;
  let post = postRef.current;

  useEffect(() => {
    const fetchSpecificPost = async () => {
      try {
        if (!postRef.current) {
          const specificPostResponse = await axios.get(
            `http://localhost:4000/api/community/post/${postId}`
          );

          if (specificPostResponse.status === 200) {
            postRef.current = specificPostResponse.data;
            setDisableButton(false);
          } else {
            throw new Error({ error: "Post not found" });
          }
        } else {
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
        setShowErrorPage(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpecificPost();
  });

  useEffect(() => {
    post && setLoadedImageUrls(post.image);
  }, [post]);

  const handleAddComment = () => {
    setShowPopup(true);
  };

  const handleOnBackClick = () => {
    navigate(-1);
  };

  const handleOnLikeClick = async () => {
    if (post.peopleWhoLikes.includes(user.userUid)) {
      dispatch(removeLike({ postId, userUid: user.userUid }));
      await axios.post(
        `http://localhost:4000/api/community/post/${postId}/neutral`,
        { userUid: user.userUid }
      );
    } else {
      dispatch(addLike({ postId, userUid: user.userUid }));
      await axios.post(
        `http://localhost:4000/api/community/post/${postId}/like`,
        { userUid: user.userUid }
      );
    }
  };
  const handleOnDislikeClick = async () => {
    try {
      if (post.peopleWhoDislikes.includes(user.userUid)) {
        dispatch(removeDislike({ postId, userUid: user.userUid }));

        await axios.post(
          `http://localhost:4000/api/community/post/${postId}/neutral`,
          { userUid: user.userUid }
        );
      } else {
        dispatch(addDislike({ postId, userUid: user.userUid}));

        await axios.post(
          `http://localhost:4000/api/community/post/${postId}/dislike`,
          { userUid: user.userUid }
        );
      }
    } catch (error) {
      console.error("Error handling dislike:", error);
    }
  };

  return isLoading ? (
    <div className="wj-loadingContainer">
      <PulseLoader size={"1.5rem"} color="#3C95A9" />
      <p className="wj-loadingText">Loading...</p>
    </div>
  ) : showErrorPage ? (
    <NotFoundPages />
  ) : (
    <div className="postContainer">
      <div className="postDetailsContainer">
        <div className="headerContainer">
          <div>
            <p className="title">{post && post.title}</p>
            <p className="author">
              By: <span className="authorName">{ post && post.author.split("//useruid//")[0]}</span>
            </p>
          </div>
          <button className="weijiePostBackButton" onClick={handleOnBackClick}>
            Back
          </button>
        </div>
        <div className="floatContainer">
          <div className="imageContainer">
            <ImageSlider images={loadedImageUrls} />
          </div>
          <div className="contentContainer">
            <span className="content">{post && post.content}</span>
          </div>
        </div>
      </div>

      <div className="feedbackContainer">
        <div className="reactionContainer">
          <span className="reactionTitle">Reaction</span>
          <div className="goodReactionContainer">
            <IconButton
              className="reactionButton"
              onClick={handleOnLikeClick}
              disabled={disableButton}
            >
              {post && post.peopleWhoLikes.includes(user.userUid) ? (
                <ThumbUpIcon className="reactionIcon" color="success" />
              ) : (
                <ThumbUpOffAltIcon className="reactionIcon" color="success" />
              )}
            </IconButton>
            <span style={{ color: "#2e7d32" }}>{post && post.likes}</span>
          </div>
          <div className="badReactionContainer">
            <IconButton
              className="reactionButton"
              onClick={handleOnDislikeClick}
              disabled={disableButton}
            >
              {post && post.peopleWhoDislikes.includes(user.userUid) ? (
                <ThumbDownAltIcon className="reactionIcon" color="error" />
              ) : (
                <ThumbDownOffAltIcon className="reactionIcon" color="error" />
              )}
            </IconButton>
            <span style={{ color: "#d32f2f" }}>{post && post.dislikes}</span>
          </div>
        </div>

        <div className="commentContainer">
          <div className="comment-header">
            <span className="comment-title">Comment</span>
            <button
              className="add-comment-button"
              onClick={handleAddComment}
              disabled={disableButton}
            >
              <svg
                className="add-comment-button-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="29"
                height="29"
                viewBox="0 0 39 39"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M8.46548 0.608655C15.7994 -0.202885 23.2006 -0.202885 30.5345 0.608655C34.5951 1.06301 37.8711 4.25534 38.3476 8.32325C39.2175 15.7491 39.2175 23.2508 38.3476 30.6766C37.8711 34.7445 34.5951 37.9369 30.5345 38.3912C23.2006 39.2029 15.7994 39.2029 8.46548 38.3912C4.40488 37.9369 1.1289 34.7445 0.652436 30.6766C-0.217479 23.2516 -0.217479 15.7506 0.652436 8.32561C0.893436 6.34933 1.7959 4.51221 3.21356 3.11198C4.63123 1.71176 6.48101 0.830494 8.46311 0.611021M19.5 7.68431C19.9715 7.68431 20.4237 7.8713 20.7571 8.20415C21.0905 8.53699 21.2778 8.98843 21.2778 9.45914V17.7251H29.5579C30.0294 17.7251 30.4816 17.9121 30.815 18.2449C31.1484 18.5778 31.3357 19.0292 31.3357 19.4999C31.3357 19.9707 31.1484 20.4221 30.815 20.7549C30.4816 21.0878 30.0294 21.2748 29.5579 21.2748H21.2778V29.5407C21.2778 30.0115 21.0905 30.4629 20.7571 30.7957C20.4237 31.1286 19.9715 31.3156 19.5 31.3156C19.0285 31.3156 18.5763 31.1286 18.2429 30.7957C17.9095 30.4629 17.7221 30.0115 17.7221 29.5407V21.2748H9.44212C8.9706 21.2748 8.5184 21.0878 8.18499 20.7549C7.85158 20.4221 7.66427 19.9707 7.66427 19.4999C7.66427 19.0292 7.85158 18.5778 8.18499 18.2449C8.5184 17.9121 8.9706 17.7251 9.44212 17.7251H17.7221V9.45914C17.7221 8.98843 17.9095 8.53699 18.2429 8.20415C18.5763 7.8713 19.0285 7.68431 19.5 7.68431Z"
                  fill="#3C95A9"
                />
              </svg>
            </button>
          </div>
          <div className="commentBody">
            {post && post.comments.length === 0 ? (
              <div className="noCommentContainer">
                <p>The topic have no comment yet! Add yours here!</p>
              </div>
            ) : (
              post && post.comments
                .slice()
                .reverse()
                .map((comment) => {
                  return (
                    <ForumPostComment
                      disable={disableButton}
                      comment={comment}
                      key={comment._id}
                      postId={post._id}
                    />
                  );
                })
            )}
          </div>
        </div>
      </div>

      {showPopup && (
        <PopupDialog setShowPopup={setShowPopup} postId={post._id} />
      )}
    </div>
  );
};

export default ForumPostDetails;
