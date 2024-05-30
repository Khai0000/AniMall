import React, { useState, useRef, useEffect } from "react";
import "../styles/ForumAddPost.css";
import imageBackground from "../assets/images/imageBackground.png";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../slices/postSlice";
import axios from "axios";

const ForumEditPost = () => {
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [buttonCount, setButtonCount] = useState(3);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const user = useSelector((state) => state.user.user);
  const post = location.state?.post;


  useEffect(() => {
    console.log("hi");
    if (post) {
      setTitleText(post.title);
      setBodyText(post.content);
      setSelectedButtons(post.tag);
      setUploadedImages([
        ...post.image,
        ...Array(3 - post.image.length).fill(null),
      ]);
      setButtonCount(Math.max(3, post.image.length));
    }
  }, [post]);

  useEffect(() => {
    const allButtonsOccupied = uploadedImages.every((image) => image !== null);
    if (allButtonsOccupied && buttonCount <= uploadedImages.length) {
      setButtonCount((prevCount) => prevCount + 1);
    }
  }, [uploadedImages,buttonCount]);

  const toggleSelectButton = (button) => {
    setSelectedButtons(
      selectedButtons.includes(button)
        ? selectedButtons.filter((currentButton) => currentButton !== button)
        : [...selectedButtons, button]
    );
  };

  const handleImageUpload = (index) => (event) => {
    const file = event.target.files[0];
    if (!file) return;

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
    document
      .querySelector(".imageButtonContainer")
      .scrollBy({ left: -180, behavior: "smooth" });
  };

  const handleCarouselRight = () => {
    document
      .querySelector(".imageButtonContainer")
      .scrollBy({ left: 180, behavior: "smooth" });
  };

  const handleDelete = (index) => {
    const newImages = [...uploadedImages];
    const newFiles = [...uploadedFiles];

    if (buttonCount <= 3) {
      newImages[index] = null;
      newFiles[index] = null;
    } else {
      newImages.splice(index, 1);
      newFiles.splice(index, 1);
      setButtonCount(buttonCount - 1);
    }
    setUploadedImages(newImages);
    setUploadedFiles(newFiles);
  };

  const handleOnBackClick = () => navigate(-1);

  const handleOnTitleChange = (e) => setTitleText(e.target.value);

  const handleOnBodyChange = (e) => setBodyText(e.target.value);

  const handleOnUpdatePostClick = async () => {
    if (!titleText.trim() || !bodyText.trim()) {
      alert("Please provide a title and body text for your post.");
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

    const updatePostApiCall = async (imageUrls) => {
      try {
        const updatePostResponse = await axios.put(
          `http://localhost:4000/api/community/post/${post._id}/edit`,
          {
            title: titleText,
            image: imageUrls,
            author: `${user.username}//useruid//${user.userUid}`,
            content: bodyText,
            tag: selectedButtons,
          }
        );

        if (updatePostResponse.status === 200) {
          dispatch(updatePost({ updatedPost: updatePostResponse.data }));
          navigate(-1);
        } else {
          console.error("Error updating post:", updatePostResponse.statusText);
          alert("Error updating post. Please try again later.");
        }
      } catch (error) {
        console.error("Error updating post:", error);
        alert("Error updating post. Please try again later.");
      }
    };

    const uploadImages = async () => {
      const formData = new FormData();
      uploadedFiles.forEach((file, index) => {
        if (file) {
          formData.append("file", file);
          const newImages = [...uploadedImages];
          newImages[index] = null;
          setUploadedImages(newImages);
        }
      });

      try {
        const imageResponse = await axios.post(
          "http://localhost:4000/image/upload",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (imageResponse.status === 200) {
          return imageResponse.data;
        } else {
          console.error("Error uploading image:", imageResponse.statusText);
          alert("Error uploading image. Please try again later.");
          return null;
        }
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("Error uploading image. Please try again later.");
        return [];
      }
    };

    const newImageUrls = uploadedFiles.every((file)=> file!==null) && uploadedFiles.length!==0? await uploadImages() : [];

    const updatedImages = [
      ...(newImageUrls.length > 0 ? newImageUrls : []),
      ...uploadedImages.filter(
        (image) =>
          image !== null && image.startsWith("http://localhost:4000/image/")
      ),
    ];

    updatePostApiCall(updatedImages);
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
                    className="deleteButton"
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
            {["cat", "dog", "others"].map((tag) => (
              <button
                key={tag}
                className={selectedButtons.includes(tag) ? "selected" : ""}
                onClick={() => toggleSelectButton(tag)}
              >
                {tag.charAt(0).toUpperCase() + tag.slice(1)}
              </button>
            ))}
          </div>
          <div className="actionButtonContainer">
            <button className="wj-addButton" onClick={handleOnUpdatePostClick}>
              Update
            </button>
            <button className="wj-backButton" onClick={handleOnBackClick}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumEditPost;
