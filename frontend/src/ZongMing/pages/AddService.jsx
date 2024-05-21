import React, { useState, useEffect } from "react";
import "../styles/ServicesDetailsInputForm.css";
import useToggle from "../components/useToggle.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { addService, editService } from "../slices/serviceSlice.js";
import axios from "axios";

const AddService = () => {
  const [showTitleInput, toggleTitle] = useToggle();
  const [showDesciptionInput, toggleDescription] = useToggle();
  const [showPriceInput, togglePrice] = useToggle();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [hidden, setHidden] = useState();
  const [rating, setRating] = useState({
    total: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  });
  const [comment, setComment] = useState([]);
  const [serviceId, setServiceId] = useState([]);


  const [allServices, setAllServices] = useState([]);
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/services");
        setAllServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const { serviceTitle } = useParams();

  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);

  useEffect(() => {
    if (serviceTitle) {
      setEditMode(true);
      const serviceToEdit = allServices.find(
        (service) => service.serviceTitle === serviceTitle
      );
      if (serviceToEdit) {
        const serviceId = serviceToEdit._id;
        setServiceId(serviceId);
        setTitle(serviceToEdit.serviceTitle);
        setDescription(serviceToEdit.serviceDescription);
        setPrice(serviceToEdit.servicePrice);
        setImages(serviceToEdit.serviceImages);
        setHidden(serviceToEdit.serviceHide);
        setRating(serviceToEdit.serviceRating);
        setComment(serviceToEdit.serviceComments);
      }
    }
  }, [serviceTitle, allServices]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
      }
    }
  };


  const handleOnAddProductClick = async () => {
    const priceString = String(price);
    if (!title.trim()) {
      alert("Please provide a title for your service.");
      return;
    }
    if (!description.trim()) {
      alert("Please provide a description for your service.");
      return;
    }
    if (!priceString.trim()) {
      alert("Please provide the price for your service.");
      return;
    }
    if (images.every((image) => image === null)) {
      alert("Please upload at least one image for your service.");
      return;
    }

    try {
      if (editMode) {
        const updatedService = {
          serviceTitle: title,
          description,
          serviceImages: images.filter((image) => image !== null),
          price,
          ratings: rating,
          comments: comment,
          hidden: hidden,
        };
        // Here you should call the API endpoint to update the service
        const response = await axios.put(`http://localhost:4000/api/services/${serviceId}`, updatedService);

        if (response.status === 200) {
          dispatch(editService({ serviceId, updatedService }));
        } else {
          alert("Failed to update the service. Please try again.");
        }
      } else {
        const newService = {
          serviceTitle: title,
          serviceDescription: description,
          serviceImages: images.filter((image) => image !== null),
          servicePrice: price,
          serviceRating: rating,
          serviceComments: comment,
          serviceHide: false,
        };
        const response = await axios.post("http://localhost:4000/api/services/add", newService);
        if (response.status === 200) {
          dispatch(addService(newService));
        } else {
          alert("Failed to add the service. Please try again.");
        }
      }
      navigate(-1);
    } catch (error) {
      console.error("Error adding service:", error);
      alert("An error occurred while adding the service. Please try again.");
    }
  };




  const triggerFileInput = () => {
    if (currentImageIndex === -1 || images.length === 0) {
      document.querySelector('input[type="file"]').click();
    }
  };
  const handleImageChange = async (e) => {
    const formData = new FormData();
    Array.from(e.target.files).forEach((file) => {
      formData.append("file", file);
    });

    try {
      const response = await axios.post("http://localhost:4000/image/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const uploadedImageUrls = response.data;

      setImages([...images, ...uploadedImageUrls]);
      setCurrentImageIndex(images.length + uploadedImageUrls.length - 1);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
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

    // Check if the image source is from the database or already a URL
    const isImageFromDatabase = images[currentImageIndex].startsWith("http://localhost:4000"); // Change the URL as per your backend setup

    // If the image is from the database
    if (isImageFromDatabase) {
      return (
        <img
          src={images[currentImageIndex]} // Assuming the image URL is stored in the images array
          alt="imgA"
          style={{ maxWidth: "100%", maxHeight: "100%" }}
        />
      );
    } else {
      // Handle other cases if needed
      return <div>Image source not recognized</div>;
    }
  };

  const handleDeleteImage = () => {
    if (currentImageIndex !== -1) {
      const updatedImages = images.filter(
        (image, index) => index !== currentImageIndex
      );
      setImages(updatedImages);
      setCurrentImageIndex(updatedImages.length > 0 ? 0 : -1);
      // Set current index to the first image if there are remaining images, otherwise to -1
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
                className={`pagination-indicator ${index === currentImageIndex ? "current" : ""
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
          <span className="Product-details-form-description">Description:</span>
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
            onClick={handleOnAddProductClick}
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
            <span id="Product-details-form-add-button-text">{editMode ? "Edit" : "Add"}</span>
          </button>
          <Link
            to={`/services/sellerService`}
            id="Product-details-form-back-button"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};
export default AddService;