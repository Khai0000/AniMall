import React, { useState, useRef, useEffect } from "react";
import "../styles/ForumAddPost.css";
import imageBackground from "../assets/images/imageBackground.png";
import ClearIcon from "@mui/icons-material/Clear";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPost } from "../slices/postSlice";

const ForumAddPost = () => {
  const [titleText, setTitleText] = useState("");
  const [bodyText, setBodyText] = useState("");
  const [buttonCount, setButtonCount] = useState(3);
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    const reader = new FileReader();

    // reader.onload = (e) => {
    //   const newImages = [...uploadedImages];
    //   newImages[index] = e.target.result;
    //   setUploadedImages(newImages);
    // };

    reader.onloadend = () => {
      const newImages = [...uploadedImages];
      newImages[index] = reader.result;
      setUploadedImages(newImages);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
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

  const handleOnAddPostClick = () => {
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

    const newPost = {
      title: titleText,
      author: "Khai",
      content: bodyText,
      tag: [...selectedButtons],
      likes: 0,
      dislikes: 0,
      image: uploadedImages.filter((image) => image !== null),
      comments: [],
      peopleWhoLikes: [],
      peopleWhoDislikes: [],
    };

    dispatch(addPost(newPost));
    navigate(-1);
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
            <button className="addButton" onClick={handleOnAddPostClick}>
              Add
            </button>
            <button className="backButton" onClick={handleOnBackClick}>
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumAddPost;
