import React from "react";
import "../styles/ForumPostDetails.css";
import dog1 from "../assets/images/dog1.jpg";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import ThumbDownOffAltIcon from "@mui/icons-material/ThumbDownOffAlt";
import IconButton from "@mui/material/IconButton";
import ForumPostComment from "../components/ForumPostComment";

const ForumPostDetails = () => {
  return (
    <div className="postContainer">
      <div className="postDetailsContainer">
        <p className="title">My experience in taking care of a dog</p>
        <p className="author">
          By: <span className="authorName">Khai</span>
        </p>
        <img src={dog1} alt="Post"/>
        <p className="content">
          Petting dogs has always been a source of immense joy and comfort for
          me. There's something incredibly therapeutic about running your
          fingers through their soft fur, feeling their warmth, and witnessing
          the pure happiness in their eyes as they receive affection. Each dog
          has its own unique personality, from the playful pup who eagerly
          nudges your hand for more scratches to the gentle older dog who leans
          into your touch with a sense of contentment. Regardless of breed or
          size, every encounter leaves me with a deep sense of connection and
          gratitude for the unconditional love and companionship that dogs
          offer.
        </p>
      </div>

      <div className="feedbackContainer">
        <div className="reactionContainer">
          <span className="reactionTitle">Reaction</span>
          <div className="goodReactionContainer">
            <IconButton className="reactionButton">
              <ThumbUpOffAltIcon className="reactionIcon" color="success" />
            </IconButton>
            <span style={{ color: "#2e7d32" }}>369</span>
          </div>
          <div className="badReactionContainer">
            <IconButton className="reactionButton">
              <ThumbDownOffAltIcon className="reactionIcon" color="error" />
            </IconButton>
            <span style={{ color: "#d32f2f" }}>369</span>
          </div>
        </div>

        <div className="commentContainer">
          <div className="commentHeader">
            <span className="commentTitle">Comment</span>
            <button className="addPostButton">+</button>
          </div>
          <div className="commentBody">
            <ForumPostComment/>
            <ForumPostComment/>
            <ForumPostComment/>
            <ForumPostComment/>
            <ForumPostComment/>
            <ForumPostComment/>
            <ForumPostComment/>
            <ForumPostComment/>
            <ForumPostComment/>
            <ForumPostComment/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumPostDetails;
