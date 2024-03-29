import { Link } from "react-router-dom";
import ForumHomeCard from "../components/ForumHomeCard";
import ForumHomeHeader from "../components/ForumHomeHeader";
import "../styles/ForumHome.css";
import { combineData } from "../data/dummyData";
import { useEffect, useState } from "react";

function ForumHome() {
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  useEffect(() => {
    let filteredData = combineData;

    if (searchText.length !== 0) {
      filteredData = filteredData.filter(
        (post) =>
          post.title.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          post.content.toLowerCase().includes(searchText.trim().toLowerCase())
      );
    }

    if (selectedCategory.length > 0) {
      filteredData = filteredData.filter((post) =>
        selectedCategory.includes(post.tag)
      );
    }

    setFilteredPosts(filteredData);
  }, [searchText, selectedCategory]);

  return (
    <div className="forumContainer">
      <ForumHomeHeader
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="forumBody">
        {filteredPosts.map((post, index) => (
          <Link
            to={`post/${index}`}
            className="forumPostLink"
            key={index}
            state={post}
          >
            <ForumHomeCard post={post} />
          </Link>
        ))}
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
