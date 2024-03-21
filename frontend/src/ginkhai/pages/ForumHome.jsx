import { Link, Navigate } from "react-router-dom";
import ForumHomeCard from "../components/ForumHomeCard";
import ForumHomeHeader from "../components/ForumHomeHeader";
import "../styles/ForumHome.css";
import { toUnitless } from "@mui/material/styles/cssUtils";

function ForumHome() {
  let postData = {
    title: "haha",
  };

  return (
    <div className="forumContainer">
      <ForumHomeHeader />
      <div className="forumBody">
        <Link to={`post/${1}`} className="forumPostLink" state={postData}>
          <ForumHomeCard />
        </Link>
        <Link to={`post/${1}`} className="forumPostLink" state={postData}>
          <ForumHomeCard />
        </Link>
        <Link to={`post/${1}`} className="forumPostLink" state={postData}>
          <ForumHomeCard />
        </Link>
        <Link to={`post/${1}`} className="forumPostLink" state={postData}>
          <ForumHomeCard />
        </Link>
        <Link to={`post/${1}`} className="forumPostLink" state={postData}>
          <ForumHomeCard />
        </Link>
        <Link to={`post/${1}`} className="forumPostLink" state={postData}>
          <ForumHomeCard />
        </Link>
        <Link to={`post/${1}`} className="forumPostLink" state={postData}>
          <ForumHomeCard />
        </Link>
      </div>
      <div className="buttonContainer">
        <Link to={`post/add`} className="forumPostLink">
          <button className="addPostButton">+</button>
        </Link>
      </div>
    </div>
  );
}

export default ForumHome;
