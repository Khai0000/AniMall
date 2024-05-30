import { useEffect, useState } from "react";
import "../styles/FormHomeCard.css";
// import FormHomeCardSkeleton from "./FormHomeCardSkeleton";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdoptFormCheck from "./AdoptFormCheck";
import { removePost } from "../slices/formHistorySlice";

const FormHomeCard = ({ form, index }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showForm, setShowForm] = useState(false); // State to control the advertisement popup
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(form);

  useEffect(() => {
    setIsLoading(true);});

    // if (post.title === "cat") {
    //   console.log(post.image[0]);
    // }

    // if (post.image[0].startsWith("data:image/")) {
    //   // If the image URL starts with "data:image/", it indicates a base64 encoded image
    //   setIsLoading(false);
    // } else if (post.image[0] === "...") {
    // } else {
    //   // Handle other image types using existing logic
    //   import(`../assets/images/dog2.jpg`)
    //     .then((image) => {})
    //     .catch((error) => {
    //       console.error("Error loading image:", error);
    //     })
    //     .finally(() => {
    //       setIsLoading(false);
    //     });
    // }
  // }, [post]);

  // const handleOnDeleteClick = async (e) => {
  //   e.stopPropagation();

  //   try {
  //     const deletePostResponse = await axios.delete(
  //       `http://localhost:4000/api/community/post/${post._id}`
  //     );

  //     if (deletePostResponse.status === 200) {
  //       dispatch(removePost(post._id));
  //       alert("Post deleted successfully");
  //     } else {
  //       console.error("Unexpected response status:", deletePostResponse.status);
  //       alert(
  //         "An error occurred while deleting the post. Please try again later."
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error deleting post:", error);
  //     alert(
  //       "An error occurred while deleting the post. Please try again later."
  //     );
  //   }
  // };
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

  return (
    <div
      className="cardContainer"
      onClick={() => {
        setShowForm(true);
        <AdoptFormCheck show={showForm} onClose={() => { setShowForm(false) }} whenApprove={whenApprove} whenReject={whenReject} />
      }}
    >
      <div className="cardDetails">
        <p className="title">{form.firstName} {form.lastName}</p>
        <div className="detailsRow">
          <p className="author">
            email: <span className="authorDetails">{form.email}</span>
          </p>
          <p className="author">
            phone: <span className="authorDetails">{form.phone}</span>
          </p>
          <p className="author">
            salary: <span className="authorDetails">{form.salary}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default FormHomeCard;