import ForumHomeCard from "../components/ForumHomeCard";
import ForumHomeHeader from "../components/ForumHomeHeader";
import "../styles/ForumHome.css";

function ForumHome() {
  return (
    <div className="forumContainer">
      <ForumHomeHeader />
      <div className="forumBody">
        <ForumHomeCard />
        <ForumHomeCard />
        <ForumHomeCard />
        <ForumHomeCard />
        <ForumHomeCard />
        <ForumHomeCard />
        <ForumHomeCard />
        <ForumHomeCard />
      </div>
      <div className="buttonContainer">
        <button className="addPostButton">+</button>
      </div>
    </div>
  );
}

export default ForumHome;
