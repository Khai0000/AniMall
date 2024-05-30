import React, { useState, useRef, useEffect } from "react";
import "../styles/ForumAddPost.css";
import imageBackground from "../assets/images/imageBackground.png";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addPost } from "../slices/postSlice";
import PulseLoader from "react-spinners/PulseLoader";
import axios from "axios";

const ForumAddPost = () => {
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [buttonCount, setButtonCount] = useState(3);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);
  const [uploadedFiles, setUploadedFiles] = useState([null, null, null]);

  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessfulPopup, setShowSuccessfulPopup] = useState(false);
  const [newPost, setNewPost] = useState(null);

  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user.user);

  useEffect(() => {
    const allButtonsOccupied = uploadedImages.every((image) => image !== null);
    if (allButtonsOccupied) {
      setButtonCount((prevCount) => prevCount + 1);
    }
  }, [uploadedImages]);

  const toggleSelectButton = (button) => {
    if (selectedButtons.includes(button)) {
      setSelectedButtons(
        selectedButtons.filter((currentButton) => {
          return currentButton !== button;
        })
      );
    } else {
      setSelectedButtons([...selectedButtons, button]);
    }
  };

  const handleImageUpload = (index) => (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const newImages = [...uploadedImages];
    newImages[index] = URL.createObjectURL(file);
    setUploadedImages(newImages);

    const newFiles = [...uploadedFiles];
    newFiles[index] = file;
    setUploadedFiles(newFiles);
  };

  const handleButtonClick = (index) => () => {
    inputRefs.current[index].click();
  };

  const handleCarouselLeft = () => {
    const container = document.querySelector(".imageButtonContainer");
    container.scrollBy({
      left: -180,
      behavior: "smooth",
    });
  };

  const handleCarouselRight = () => {
    const container = document.querySelector(".imageButtonContainer");
    container.scrollBy({
      left: 180,
      behavior: "smooth",
    });
  };

  const handleDelete = (index) => {
    if (buttonCount <= 3) {
      const newImages = [...uploadedImages];
      newImages[index] = null;
      setUploadedImages(newImages);
    } else {
      const newImages = [...uploadedImages];
      newImages.splice(index, 1);
      setUploadedImages(newImages);
      setButtonCount(buttonCount - 1);
    }

    const newFiles = [...uploadedFiles];
    newFiles[index] = null;
    setUploadedFiles(newFiles);
  };

  const handleOnBackClick = () => {
    navigate(-1);
  };

  const handleOnTitleChange = (e) => {
    setTitleText(e.target.value);
  };

  const handleOnBodyChange = (e) => {
    setBodyText(e.target.value);
  };

  const handleOnAddPostClick = async () => {
    if (!titleText.trim()) {
      alert("Please provide a title for your post.");
      return;
    }

    if (!bodyText.trim()) {
      alert("Please provide the body text for your post.");
      return;
    }

    if (uploadedImages.every((image) => image === null)) {
      alert("Please upload at least one image for your post.");
      return;
    }

    if (selectedButtons.length === 0) {
      alert("Please select at least one tag for your post.");
      return;
    }
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      if (file) formData.append("file", file);
    });

    try {
      setIsUploading(true);
      const imageResponse = await axios.post(
        "http://localhost:4000/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Make sure to set proper content type
          },
        }
      );

      if (imageResponse.status === 200) {
        console.log("Image uploaded successfully", imageResponse.data);

        const newPostResponse = await axios.post(
          "http://localhost:4000/api/community/post/add",
          {
            title: titleText,
            image: imageResponse.data,
            author: user.username + "//useruid//" + user.userUid,
            content: bodyText,
            tag: [...selectedButtons],
          }
        );

        if (newPostResponse.status === 200) {
          setShowSuccessfulPopup(true);
          setNewPost(newPostResponse.data);
        } else {
          console.error("Error uploading image:", newPostResponse.statusText);
          alert("Error uploading post. Please try again later.");
        }
      } else {
        console.error("Error uploading image:", imageResponse.statusText);
        alert("Error uploading image. Please try again later.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again later.");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="forumAddPostContainer">
      <input
        type="text"
        placeholder="Add your title here!"
        value={titleText}
        onChange={handleOnTitleChange}
      />
      <textarea
        rows={10}
        placeholder="Leave your text here!"
        value={bodyText}
        onChange={handleOnBodyChange}
      />
      <div className="addPostDetailsContainer">
        <div className="imageContainer">
          <div className="imageButtonContainer">
            {buttonCount > 3 && (
              <button
                className="carouselLeftButton"
                onClick={handleCarouselLeft}
              >
                {"<"}
              </button>
            )}
            {[...Array(buttonCount)].map((_, index) => (
              <button
                key={index}
                className="imageButton"
                onClick={handleButtonClick(index)}
              >
                <input
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload(index)}
                  style={{ display: "none" }}
                />
                <img
                  src={uploadedImages[index] || imageBackground}
                  alt={`Post Cover`}
                />
                {uploadedImages[index] && (
                  <button
                    className="wjImageDeleteButton"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(index);
                    }}
                  >
                    <ClearIcon onClick={() => handleDelete(index)} />
                  </button>
                )}
              </button>
            ))}
            {buttonCount > 3 && (
              <button
                className="carouselRightButton"
                onClick={handleCarouselRight}
              >
                {">"}
              </button>
            )}
          </div>
        </div>
        <div className="tagContainer">
          <p>Select Your Tag!</p>
          <div className="tagButtonContainer">
            <button
              className={selectedButtons.includes("cat") ? "selected" : ""}
              onClick={() => toggleSelectButton("cat")}
            >
              Cat
            </button>
            <button
              className={selectedButtons.includes("dog") ? "selected" : ""}
              onClick={() => toggleSelectButton("dog")}
            >
              Dog
            </button>
            <button
              className={selectedButtons.includes("others") ? "selected" : ""}
              onClick={() => toggleSelectButton("others")}
            >
              Others
            </button>
          </div>
          <div className="actionButtonContainer">
            <button className="wj-addButton" onClick={handleOnAddPostClick}>
              Add
            </button>
            <button className="wj-backButton" onClick={handleOnBackClick}>
              Back
            </button>
          </div>
        </div>
      </div>
      {isUploading && (
        <div className="forumPostAddingLoadingBackground">
          <div className="forumPostAddingLoadingContainer">
            <PulseLoader size={"1.5rem"} color="#3C95A9" />
            <p className="forumPostAddingContainerLoadingText">
              Uploading...
            </p>
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
            dispatch(addPost(newPost));
            navigate(-1);
          }}
        >
          <div
            className="forumPostDeleteContainer"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <h2>Post Added Successfully !</h2>
            <div className="forumPostDeleteButtonContainer">
              <button
                className="deleteForumPostButton"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowSuccessfulPopup(false);
                  dispatch(addPost(newPost));
                  navigate(-1);
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

export default ForumAddPost;
