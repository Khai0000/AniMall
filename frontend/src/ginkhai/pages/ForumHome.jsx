import React, { useMemo } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import ForumHomeHeader from "../components/ForumHomeHeader";
import ForumHomeCardSkeleton from "../components/ForumHomeCardSkeleton";
import "../styles/ForumHome.css";
import { Link } from "react-router-dom";
import { useEffect, useState, lazy, Suspense, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setScrollPosition } from "../slices/forumHistorySlice";

const ForumHomeCard = lazy(() => import("../components/ForumHomeCard"));

function ForumHome() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const memoizedPosts = useMemo(() => posts || [], [posts]);
  const forumHistory = useSelector((state) => state.forumHistory);

  const { selectedCategory, searchText, selectedDate, scrollPosition } =
    forumHistory;

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);



  // useEffect for restoring last scrolling position
  useEffect(() => {
    if (containerRef.current && scrollPosition) {
      containerRef.current.scrollTop = scrollPosition;
    }
  });

  // useEffect for filtering data
  useEffect(() => {
    let filteredData = memoizedPosts;
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

    if (selectedDate) {
      const selectedDateString = selectedDate.toLocaleDateString(undefined, {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      filteredData = filteredData.filter((post) => {
        const postDateString = new Date(post.createdAt).toLocaleDateString(
          undefined,
          {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }
        );
        return postDateString === selectedDateString;
      });
    }

    setIsLoading(false);
    setFilteredPosts(filteredData);
  }, [searchText, selectedCategory, memoizedPosts, selectedDate, dispatch]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        dispatch(setScrollPosition(containerRef.current.scrollTop));
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, [dispatch, containerRef]);

  return (
    <div className="forumContainer">
      <ForumHomeHeader />
      <div className="forumBody" ref={containerRef}>
        {isLoading ? (
          <div className="wj-loadingContainer">
            <PulseLoader size={"1.5rem"} color="#3C95A9" />
            <p className="wj-loadingText">Loading...</p>
          </div>
        ) : filteredPosts.length !== 0 ? (
          <Suspense fallback={<ForumHomeCardSkeleton />}>
            {filteredPosts.map((post, index) => (
              <ForumHomeCard post={post} index={index} key={post._id} />
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
