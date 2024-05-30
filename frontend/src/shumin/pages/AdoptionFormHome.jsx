import React, { useMemo, useEffect, useState, lazy, Suspense, useRef } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import FormHomeHeader from "../components/FormHomeHeader";
import FormHomeCardSkeleton from "../components/FormHomeCardSkeleton";
import "../styles/FormHome.css";
import { useSelector, useDispatch } from "react-redux";
import { setScrollPosition, setInitialPost } from "../slices/formHistorySlice"; // Corrected import
import axios from "axios";
import AdoptFormCheck from "../components/AdoptFormCheck";
import { removePost } from "../slices/formHistorySlice";

const FormHomeCard = lazy(() => import("../components/FormHomeCard"));

function AdoptionFormHome() {
  const dispatch = useDispatch();
  const form = useSelector((state) => state.form);
  const memoizedPosts = useMemo(() => form || [], [form]);
  const formHistory = useSelector((state) => state.formHistory) || {}; // Ensure formHistory is an object
  const [showForm, setShowForm] = useState(false); // State to control the advertisement popup

  const { searchText = '', scrollPosition = 0 } = formHistory;

  const [filteredPosts, setFilteredPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  const whenReject = async (e) => {
    e.stopPropagation();

    try {
      const deletePostResponse = await axios.delete(
        `http://localhost:4000/api/pet/post/${form._id}`
      );

      if (deletePostResponse.status === 200) {
        dispatch(removePost(form._id));
        alert("Form deleted successfully");
      } else {
        console.error("Unexpected response status:", deletePostResponse.status);
        alert(
          "An error occurred while deleting the form. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      alert(
        "An error occurred while deleting the form. Please try again later."
      );
    }
  };

  const whenApprove = async (e) => {
    e.stopPropagation();

    try {
      const deletePostResponse = await axios.delete(
        `http://localhost:4000/api/pet/post/${form._id}`
      );

      if (deletePostResponse.status === 200) {
        dispatch(removePost(form._id));
        alert("Form deleted successfully");
      } else {
        console.error("Unexpected response status:", deletePostResponse.status);
        alert(
          "An error occurred while deleting the form. Please try again later."
        );
      }
    } catch (error) {
      console.error("Error deleting form:", error);
      alert(
        "An error occurred while deleting the form. Please try again later."
      );
    }
  };
  // useEffect(() => {
  //   const getFormPosts = async () => {
  //     try {
  //       const formPostsResponse = await axios.get("http://localhost:4000/api/pet");
  //       if (formPostsResponse.status === 200) {
  //         const data = Array.isArray(formPostsResponse.data) ? formPostsResponse.data : [];
  //         dispatch(setInitialPost(data));
  //         console.log("I am executing man!!");
  //       } else {
  //         console.log('Unexpected response status:', formPostsResponse.status);
  //       }
  //     } catch (error) {
  //       console.error('Error fetching form posts:', error);
  //       // Perform necessary action (e.g., set error state)
  //     }
  //   };

  //   if (!form || form.length === 0) getFormPosts();
  // }, [dispatch, form]);

  useEffect(() => {
    setIsLoading(true);
    const getFormPosts = async () => {
      try {
        const formPostsResponse = await axios.get(
          "http://localhost:4000/api/pet/adoption"
        );
        if (formPostsResponse.status === 200) {
          dispatch(setInitialPost(formPostsResponse.data));
          console.log(formPostsResponse.data);
        } else {
          console.log(formPostsResponse);
        }
      } catch (error) {
        // Perform neccessary action;
      }
    };

    getFormPosts();
  },[dispatch]);


  useEffect(() => {
    let filteredData = Array.isArray(memoizedPosts) ? memoizedPosts : [];
    setIsLoading(true);

    if (searchText.length !== 0) {
      filteredData = filteredData.filter(
        (form) =>
          form.firstName.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          form.lastName.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          form.email.toLowerCase().includes(searchText.trim().toLowerCase()) ||
          form.phone.toLowerCase().includes(searchText.trim().toLowerCase())
      );
    }

    setIsLoading(false);
    setFilteredPosts(filteredData);
  }, [searchText, memoizedPosts, dispatch]);



  return (
    <div className="formContainer">
      <FormHomeHeader />
      <div className="formBody" ref={containerRef}>
        {isLoading ? (
          <div className="loadingContainer">
            <CircularProgress className="circularProgress" />
          </div>
        ) : Array.isArray(filteredPosts) && filteredPosts.length !== 0 ? (
          <Suspense fallback={<FormHomeCardSkeleton />}>
            {filteredPosts.map((form, index) => (
              <FormHomeCard form={form} index={index} key={form._id} />
            ))}
          </Suspense>
        ) : (
          <div className="formNoDiscussionContainer">
            <p>There is no adoption application.</p>
          </div>
        )}
      </div>
      {/* <AdoptFormCheck show={showForm} onClose={() => { setShowForm(false) }} whenApprove={whenApprove} whenReject={whenReject} /> */}
    </div>
  );
}

export default AdoptionFormHome;
