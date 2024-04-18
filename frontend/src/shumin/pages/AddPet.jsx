import React, { useState, useEffect } from "react";
import "../styles/ProductDetailsInputForm.css";
import useToggle from "../hooks/useToggle.js";
import { useDispatch, useSelector } from "react-redux";
import { addPet, editPet } from "../slices/PetSlice.js";
import { PetData } from "../data/DummyPetData.js";
import { Link, useParams, useNavigate } from "react-router-dom";

const AddPet = () => {
  const [showTitleInput, toggleTitle] = useToggle();
  const [showDesciptionInput, toggleDescription] = useToggle();
  const [showPriceInput, togglePrice] = useToggle();
  const [showBirthdateInput, toggleBirthdate] = useToggle();
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [birthdate, setBirthdate] = useState("");
  const [selectedAnimalTag, setSelectedAnimalTag] = useState("");
  const [hidden, setHidden] = useState();
  const [stockLevel, setStockLevel] = useState();

  const [isDogFocused, setIsDogFocused] = useState(false);
  const [isCatFocused, setIsCatFocused] = useState(false);
  const [isOthersFocused, setIsOthersFocused] = useState(false);
  const pets = useSelector((state) => state.pets);
  const { id } = useParams();

  //for image
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);

  useEffect(() => {
    // Check if an ID is provided, indicating an edit mode
    if (id) {
      setEditMode(true);
      // Find the product with the provided ID
      const petToEdit = pets.find((pet) => pet.id === id);
      if (petToEdit) {
        // Populate the state with existing product details for editing
        setTitle(petToEdit.title);
        setDescription(petToEdit.description);
        setPrice(petToEdit.price);
        if (petToEdit.animaltag === "dog") {
          setIsDogFocused(true);
        } else if (petToEdit.animaltag === "cat") {
          setIsCatFocused(true);
        } else if (petToEdit.animaltag === "others") {
          setIsOthersFocused(true);
        }
        setImages(petToEdit.image);
        setHidden(petToEdit.hidden);
        setStockLevel(petToEdit.stockLevel);
        setBirthdate(petToEdit.birthdate);
      }
    }
  }, [id, pets]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (pets.length === 0) {
      PetData.forEach((pet) => {
        dispatch(addPet(pet));
      });
    }
  }, [dispatch, pets]);

  const toggleSelectedAnimalTag = (button) => {
    if (selectedAnimalTag === button) {
      setSelectedAnimalTag(null);
      switch (button) {
        case "dog":
          setIsDogFocused(false);
          break;
        case "cat":
          setIsCatFocused(false);
          break;
        case "others":
          setIsOthersFocused(false);
          break;
        default:
          break;
      }
    } else {
      setSelectedAnimalTag(button);
      setIsDogFocused(button === "dog");
      setIsCatFocused(button === "cat");
      setIsOthersFocused(button === "others");
    }
  };

  const generatePetId = () => {
    if (pets.length === 0) {
      return "A0001"; // If no pets, start with A0001
    }

    const lastPetId = pets[pets.length - 1].id;
    const lastIdNumber = parseInt(lastPetId.slice(1), 10);
    const newIdNumber = lastIdNumber + 1;
    const paddedNewId = String(newIdNumber).padStart(4, "0");
    return `A${paddedNewId}`;
  };

  const handleKeyPress = (e, fieldType) => {
    if (e.key === "Enter") {
      if (fieldType === "title") {
        setTitle(e.target.value);
        toggleTitle();
      } else if (fieldType === "description") {
        setDescription(e.target.value);
        toggleDescription();
      } else if (fieldType === "price") {
        setPrice(parseFloat(e.target.value));
        togglePrice();
      } else if (fieldType === "birthdate") {
        setBirthdate(e.target.value);
        toggleBirthdate();
      }
    }
  };

  const getSelectedTags = () => {
    let animalTag = "";

    if (isDogFocused) {
      animalTag = "dog";
    } else if (isCatFocused) {
      animalTag = "cat";
    } else if (isOthersFocused) {
      animalTag = "others";
    }

    return animalTag;
  };

  const handleOnAddPetClick = () => {
    const priceString = String(price);
    if (!title.trim()) {
      alert("Please provide a title for your pet.");
      return;
    }

    if (!description.trim()) {
      alert("Please provide the description for your pet.");
      return;
    }

    if (!priceString.trim() || isNaN(price)) {
      alert("Please provide the price for your pet.");
      return;
    }

    if (!birthdate.trim()) {
      alert("Please provide the birthdate for your pet.");
      return;
    }

    if (images.every((image) => image === null)) {
      alert("Please upload at least one image for your pet.");
      return;
    }

    const animalTag = getSelectedTags();

    if (editMode) {
      const updatedPet = {
        id,
        title,
        description,
        birthdate,
        image: images.filter((image) => image !== null),
        animaltag: animalTag,
        price: parseInt(price),
        stockLevel: stockLevel,
        hidden: hidden,
      };
      // Dispatch editProduct action
      dispatch(editPet(updatedPet));
    } else {
      // Generate ID for the new product
      const newPetId = generatePetId();

      const newPet = {
        title: title,
        id: newPetId,
        description: description,
        image: images.filter((image) => image !== null),
        animaltag: selectedAnimalTag,
        price: parseInt(price),
        birthdate: birthdate,
        stockLevel: 1,
        hidden: false,
      };

      dispatch(addPet(newPet));
    }
    navigate(-1);
  };

  const triggerFileInput = () => {
    if (currentImageIndex === -1 || images.length === 0) {
      document.querySelector('input[type="file"]').click();
    }
  };

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files).map((file) =>
      URL.createObjectURL(file)
    );
    setImages([...images, ...newImages]);
    setCurrentImageIndex(images.length + newImages.length - 1);
  };

  const navigateImage = (direction, e) => {
    e.stopPropagation();

    if (images.length === 0) {
      setCurrentImageIndex(-1);
      return;
    }

    let newIndex = currentImageIndex;
    if (direction === "prev") {
      newIndex =
        currentImageIndex === -1
          ? images.length - 1
          : currentImageIndex > 0
          ? currentImageIndex - 1
          : images.length - 1;
    } else if (direction === "next") {
      newIndex =
        currentImageIndex < images.length - 1 ? currentImageIndex + 1 : -1;
    }
    setCurrentImageIndex(newIndex);
  };

  const displayContent = () => {
    if (currentImageIndex === -1) {
      return <div className="placeholder">Click to add image</div>;
    }

    // Check if the image source is from the file explorer or already a URL
    const isImageFromFileExplorer =
      images[currentImageIndex].startsWith("blob:"); // Assuming file explorer URLs start with 'blob:'

    if (isImageFromFileExplorer) {
      return (
        <img
          src={images[currentImageIndex]}
          alt="Pet for sales"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      );
    } else {
      if (images.length === 0) {
        return null;
      } else if (images.length === 1) {
        return (
          <img
            src={require(`../assets/images/${images[0]}`)}
            alt="Pet for sales"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        );
      } else if (images.length === 2) {
        return (
          <>
            {currentImageIndex === 0 && (
              <img
                src={require(`../assets/images/${images[0]}`)}
                alt="Pet for sales"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
            {currentImageIndex === 1 && (
              <img
                src={require(`../assets/images/${images[1]}`)}
                alt="Pet for sales"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
          </>
        );
      } else {
        return (
          <img
            src={require(`../assets/images/${images[currentImageIndex]}`)}
            alt="Pet for sales"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        );
      }
    }
  };

  const handleDeleteImage = () => {
    if (currentImageIndex !== -1) {
      const updatedImages = images.filter(
        (image, index) => index !== currentImageIndex
      );
      setImages(updatedImages);
      setCurrentImageIndex(updatedImages.length > 0 ? 0 : -1); // Set current index to the first image if there are remaining images, otherwise to -1
    }
  };

  return (
    <div>
      <div className="image-uploader-container" onClick={triggerFileInput}>
        <div className="image-container">
          {displayContent()}
          {currentImageIndex !== -1 && (
            <div className="image-overlay">
              <button className="delete-button" onClick={handleDeleteImage}>
                Delete Image
              </button>
            </div>
          )}
        </div>
        <div className="overlay-controls">
          <button
            className="nav-button prev-button"
            onClick={(e) => navigateImage("prev", e)}
            disabled={images.length === 0 && currentImageIndex === -1}
          >
            {"<"}
          </button>
          <div className="pagination-dots">
            {images.map((_, index) => (
              <span
                key={index}
                className={`pagination-indicator ${
                  index === currentImageIndex ? "current" : ""
                }`}
                onClick={() => setCurrentImageIndex(index)}
              >
                •
              </span>
            ))}
          </div>
          <button
            className="nav-button next-button"
            onClick={(e) => navigateImage("next", e)}
            disabled={images.length === 0 && currentImageIndex === -1}
          >
            {">"}
          </button>
        </div>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="Product-details-form-container">
        <div onClick={toggleTitle}>
          {showTitleInput ? (
            <input
              onClick={(e) => e.stopPropagation()}
              onKeyPress={(e) => handleKeyPress(e, "title")}
              className="Product-details-form-title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          ) : (
            <span className="Product-details-form-title">
              {title || "Title"}
            </span>
          )}
        </div>
        <div onClick={toggleDescription}>
          <br />
          <span className="Product-details-form-description">
            Description:{" "}
          </span>
          {showDesciptionInput ? (
            <input
              onClick={(e) => e.stopPropagation()}
              className="Product-details-form-description-input"
              onKeyPress={(e) => handleKeyPress(e, "description")}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <span className="Product-details-form-description-content">
              {description || "Click here to enter description..."}
            </span>
          )}
        </div>
        <div onClick={toggleBirthdate}>
          <br />
          <span className="Product-details-form-birthdate">Birth Date: </span>
          {showBirthdateInput ? (
            <input
              onClick={(e) => e.stopPropagation()}
              onKeyPress={(e) => handleKeyPress(e, "birthdate")}
              className="Product-details-form-birthdate-input"
              value={birthdate}
              onChange={(e) => setBirthdate(e.target.value)}
            />
          ) : (
            <span className="Product-details-form-birthdate-content">
              {birthdate || "birthdate"}
            </span>
          )}
        </div>
        <div className="Product-details-form-product-categories-container">
          <span className="Product-details-form-product-categories-animal">
            Animal type:{" "}
          </span>
          <button
            className={`Product-details-form-product-categories-button ${
              isDogFocused ? "focused" : ""
            }`}
            onClick={() => toggleSelectedAnimalTag("dog")}
          >
            Dog
          </button>
          <button
            className={`Product-details-form-product-categories-button ${
              isCatFocused ? "focused" : ""
            }`}
            onClick={() => toggleSelectedAnimalTag("cat")}
          >
            Cat
          </button>
          <button
            className={`Product-details-form-product-categories-button ${
              isOthersFocused ? "focused" : ""
            }`}
            onClick={() => toggleSelectedAnimalTag("others")}
          >
            Others
          </button>
        </div>
        <div onClick={togglePrice}>
          <br />
          <span className="Product-details-form-price">Price: RM </span>
          {showPriceInput ? (
            <input
              type="number"
              onClick={(e) => e.stopPropagation()}
              className="Product-details-form-price-input"
              onKeyPress={(e) => handleKeyPress(e, "price")}
              value={price}
              onChange={(e) => setPrice(parseFloat(e.target.value))}
            />
          ) : (
            <span className="Product-details-form-price-content">
              {price || " XX"}
            </span>
          )}
        </div>
        <div className="Product-details-form-add-back-button">
          <button
            id="Product-details-form-add-button"
            onClick={handleOnAddPetClick}
          >
            <svg
              id="Product-details-form-add-button-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 25 22"
              fill="none"
            >
              <path
                d="M19.6875 15.1247H5.32812C5.15625 15.1247 5.01562 15.2794 5.01562 15.4684L5.01172 17.531C5.01172 17.7201 5.15234 17.8748 5.32422 17.8748H19.6875C19.8594 17.8748 20 17.7201 20 17.531V15.4684C20 15.2794 19.8594 15.1247 19.6875 15.1247ZM19.6875 19.2499H5.31641C5.14453 19.2499 5.00391 19.4046 5.00391 19.5936L5 21.6562C5 21.8453 5.14062 22 5.3125 22H19.6875C19.8594 22 20 21.8453 20 21.6562V19.5936C20 19.4046 19.8594 19.2499 19.6875 19.2499ZM19.6875 10.9995H5.33594C5.16406 10.9995 5.02344 11.1542 5.02344 11.3432L5.01953 13.4058C5.01953 13.5949 5.16016 13.7496 5.33203 13.7496H19.6875C19.8594 13.7496 20 13.5949 20 13.4058V11.3432C20 11.1542 19.8594 10.9995 19.6875 10.9995ZM23.8477 5.02652L13.2188 0.157921C12.9903 0.0536643 12.7454 0 12.498 0C12.2507 0 12.0058 0.0536643 11.7773 0.157921L1.15234 5.02652C0.457031 5.3488 0 6.09649 0 6.93013V21.6562C0 21.8453 0.140625 22 0.3125 22H3.4375C3.60938 22 3.75 21.8453 3.75 21.6562V10.9995C3.75 10.2432 4.32031 9.6244 5.02344 9.6244H19.9766C20.6797 9.6244 21.25 10.2432 21.25 10.9995V21.6562C21.25 21.8453 21.3906 22 21.5625 22H24.6875C24.8594 22 25 21.8453 25 21.6562V6.93013C25 6.09649 24.543 5.3488 23.8477 5.02652Z"
                fill="white"
              />
            </svg>
            {editMode ? (
              <span id="Product-details-form-add-button-text">Save</span>
            ) : (
              <span id="Product-details-form-add-button-text">Add</span>
            )}
          </button>
          <Link to={`/pet/sellerPet`} id="Product-details-form-back-button">
            Go Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddPet;
