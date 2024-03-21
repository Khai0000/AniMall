import React, { useState, useRef, useEffect } from "react";
import "../styles/ForumAddPost.css";
import imageBackground from "../assets/images/imageBackground.png";
import ClearIcon from "@mui/icons-material/Clear";

const ForumAddPost = () => {
  const [selectedButtons, setSelectedButtons] = useState([]);
  const [uploadedImages, setUploadedImages] = useState([null, null, null]);
  const [buttonCount, setButtonCount] = useState(3);
  const inputRefs = useRef([]);

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

    reader.onload = (e) => {
      const newImages = [...uploadedImages];
      newImages[index] = e.target.result;
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

  return (
    <div className="forumAddPostContainer">
      <input type="text" placeholder="Add your title here!" />
      <textarea rows={10} placeholder="Leave your text here!" />
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
                  alt={`Selected image ${index + 1}`}
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
              className={selectedButtons.includes("Cat") ? "selected" : ""}
              onClick={() => toggleSelectButton("Cat")}
            >
              Cat
            </button>
            <button
              className={selectedButtons.includes("Dog") ? "selected" : ""}
              onClick={() => toggleSelectButton("Dog")}
            >
              Dog
            </button>
            <button
              className={selectedButtons.includes("Others") ? "selected" : ""}
              onClick={() => toggleSelectButton("Others")}
            >
              Others
            </button>
          </div>
          <div className="actionButtonContainer">
            <button className="addButton">Add</button>
            <button className="backButton">Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForumAddPost;
