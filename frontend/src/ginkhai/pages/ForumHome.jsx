import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, lazy, Suspense, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import ForumHomeHeader from "../components/ForumHomeHeader";
import { useSelector, useDispatch } from "react-redux";
import "../styles/ForumHome.css";
import ForumHomeCardSkeleton from "../components/ForumHomeCardSkeleton";

const ForumHomeCard = lazy(() => import("../components/ForumHomeCard"));

function ForumHome() {
  const location = useLocation();
  const posts = useSelector((state) => state.posts);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchText, setSearchText] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [scrollIndex, setScrollIndex] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const loadSavedState = () => {
      const savedState = localStorage.getItem("forumHomeState");
      if (savedState) {
        const { selectedCategory, searchText, scrollIndex } =
          JSON.parse(savedState);
        setSelectedCategory(selectedCategory);
        setSearchText(searchText);
        setScrollIndex(scrollIndex);
        localStorage.removeItem("forumHomeState");
      }
    };

    loadSavedState();

    let filteredData = posts;
    setIsLoading(true);

    if (searchText.length !== 0) {
      filteredData = filteredData.filter(
        (post) =>
          post.title.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          post.content.toLowerCase().includes(searchText.trim().toLowerCase())
      );
    }

    if (selectedCategory.length > 0) {
      filteredData = filteredData.filter((post) =>
        selectedCategory.some((tag) => post.tag.includes(tag))
      );
    }

    setIsLoading(false);
    setFilteredPosts(filteredData);
  }, [searchText, selectedCategory, dispatch, posts]);

  useEffect(() => {
    if (containerRef.current) {
      if (scrollIndex !== null && scrollIndex>0) { // Check if scrollIndex is not null or undefined
        const lastScroll = containerRef.current.children[scrollIndex-1];
        if (lastScroll) {
          const containerTop = containerRef.current.getBoundingClientRect().top;
          const lastScrollTop = lastScroll.getBoundingClientRect().top;
          const offset = lastScrollTop - containerTop;
          containerRef.current.scrollTop += offset;
        }
      }
    }
  });

  const handleOnLinkClick = (index) => {
    const stateToSave = {
      selectedCategory,
      searchText,
      scrollIndex: index,
    };
    localStorage.setItem("forumHomeState", JSON.stringify(stateToSave));
  };

  return (
    <div className="forumContainer">
      <ForumHomeHeader
        setSelectedCategory={setSelectedCategory}
        selectedCategory={selectedCategory}
        searchText={searchText}
        setSearchText={setSearchText}
      />
      <div className="forumBody" ref={containerRef}>
        {isLoading ? (
          <div className="loadingContainer">
            <CircularProgress className="circularProgress" />
          </div>
        ) : filteredPosts.length !== 0 ? (
          <Suspense fallback={<ForumHomeCardSkeleton />}>
            {filteredPosts.map((post, index) => (
              <Link
                to={`post/${index}`}
                className="forumPostLink"
                key={index}
                state={post}
                onClick={() => handleOnLinkClick(index)}
              >
                <ForumHomeCard post={post} />
              </Link>
            ))}
          </Suspense>
        ) : (
          <div className="forumNoDiscussionContainer">
            <p>There is no discussion yet! Add your topic here!</p>
          </div>
        )}
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
