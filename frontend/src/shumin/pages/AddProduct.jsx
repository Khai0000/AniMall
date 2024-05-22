import React, { useState,useEffect } from "react";
import "../styles/ProductDetailsInputForm.css";
import useToggle from "../hooks/useToggle.js";
import { useDispatch} from "react-redux";
import { addProduct,editProduct} from "../slices/ProductSlice.js";
import { Link ,useParams,useNavigate} from "react-router-dom";
import axios from "axios";

const AddProduct =()=>{
  const [showTitleInput, toggleTitle] = useToggle();
  const [showDesciptionInput, toggleDescription] = useToggle();
  const [showPriceInput, togglePrice] = useToggle();
  const [editMode, setEditMode] = useState(false);
  const [imagesToDelete, setImagesToDelete] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState();
  const [selectedAnimalTag, setSelectedAnimalTag]=useState();
  const [selectedProductTag,setSelectedProductTag]=useState();
  const [hidden,setHidden]=useState();
  const [stockLevel, setStockLevel]=useState();
  const [rating, setRating] = useState({
    total:0,
    1:0,
    2:0,
    3:0,
    4:0,
    5:0,
  });
  const [comment, setComment] = useState([]);

  const [isDogFocused, setIsDogFocused] = useState(false);
  const [isCatFocused, setIsCatFocused] = useState(false);
  const [isFoodFocused, setIsFoodFocused] = useState(false);
  const [isAccessoriesFocused, setIsAccessoriesFocused] = useState(false);
  const [isOthersFocused, setIsOthersFocused] = useState(false);

  //const products = useSelector((state)=> state.products);
  const { id } = useParams(); 
  const navigate = useNavigate();
  const dispatch=useDispatch();

  //for image
  const [images, setImages] = useState([]);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);

  useEffect(() => {
    const fetchProduct = async() =>{
      // Check if an ID is provided, indicating an edit mode
      if (id) {
        setEditMode(true);
        try{
          const response = await axios.get(`http://localhost:4000/api/product/product/${id}`);
          const productToEdit = response.data;

          setTitle(productToEdit.title);
          setDescription(productToEdit.description);
          setPrice(productToEdit.price);
          setImages(productToEdit.image);
          setHidden(productToEdit.hidden);
          setStockLevel(productToEdit.stockLevel);
          setRating(productToEdit.ratings);
          setComment(productToEdit.comments);

          if (productToEdit.animaltag === "dog") setIsDogFocused(true);
          else if (productToEdit.animaltag === "cat") setIsCatFocused(true);
          else if (productToEdit.animaltag === "others") setIsOthersFocused(true);

          if (productToEdit.producttag === "food") setIsFoodFocused(true);
          else setIsAccessoriesFocused(true);
        }catch(error){
          console.error("Error fetching product:"+error);
          alert("Error fetching product. Please try again later.");
        }
    }
  };
  fetchProduct();
}, [id]);

  const toggleSelectedAnimalTag= (button) => {
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

  const toggleSelectedProductTag= (button) => {
    if (selectedProductTag === button) {
      setSelectedProductTag(null);
      switch (button) {
        case "food":
          setIsFoodFocused(false); 
          break;
        case "accessories":
          setIsAccessoriesFocused(false);
          break;
        default:
          break;
      }
    } else {
      setSelectedProductTag(button);
      setIsFoodFocused(button === "food");
      setIsAccessoriesFocused(button === "accessories");
    }
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
        setPrice(e.target.value);
        togglePrice();
      }
    }
  };

  const getSelectedTags = () => {
    let animalTag = "";
    let productTag = "";
  
    if (isDogFocused) {
      animalTag = "dog";
    } else if (isCatFocused) {
      animalTag = "cat";
    } else if (isOthersFocused) {
      animalTag = "others";
    }
  
    if (isFoodFocused) {
      productTag = "food";
    } else if (isAccessoriesFocused) {
      productTag = "accessories";
    }
  
    return {
      animalTag,
      productTag,
    };
  };
  

  const handleOnAddProductClick = async () => {
    const priceString = String(price);
    if (!title.trim()) {
      alert("Please provide a title for your product.");
      return;
    }
  
    if (!description.trim()) {
      alert("Please provide the description for your product.");
      return;
    }
  
    if (!priceString.trim() || isNaN(price)) { 
      alert("Please provide the price for your product.");
      return;
    }
  
    if (images.every((image) => image === null)) {
      alert("Please upload at least one image for your product.");
      return;
    }
  
    const { animalTag, productTag } = getSelectedTags();
  
    const formData = new FormData();
    uploadedFiles.forEach((file) => {
      if (file) formData.append("file", file);
    });

    try {
      let uploadedImageUrls = [];
      if (uploadedFiles.length > 0) {
        const imageResponse = await axios.post(
          "http://localhost:4000/image/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        if (imageResponse.status === 200) {
          uploadedImageUrls = imageResponse.data; // Assuming response contains URLs
        } else {
          console.error("Error uploading image:", imageResponse.statusText);
          alert("Error uploading image. Please try again later.");
          return;
        }
      }

      if (editMode) {
        for (const imageFileName of imagesToDelete) {
          try {
            const response = await axios.delete(`http://localhost:4000/image/${imageFileName}`);
            if (response.status === 200) {
              console.log(`Image ${imageFileName} deleted successfully`);
            } else {
              console.error(`Error deleting image ${imageFileName}:`, response.statusText);
            }
          } catch (error) {
            console.error(`Error deleting image ${imageFileName}:`, error);
          }
        }

        const filteredExistingImages = images.filter(image => !image.startsWith('blob:'));
        const updatedProduct = {
          title,
          description,
          image:  [...filteredExistingImages, ...uploadedImageUrls],
          animaltag: animalTag,
          producttag: productTag,
          price:parseFloat(price),
          ratings: rating,
          comments: comment,
          stockLevel: stockLevel,
          hidden: hidden,
        };
          
        try{
            const response=await axios.put(`http://localhost:4000/api/product/product/${id}`,updatedProduct);
            if(response.status === 200){
              dispatch(editProduct(updatedProduct));
              navigate(-1);
            }
          }catch(error){
            console.error("Error updating product:", error);
            alert("Error updating product/ Please try again later.");
        }
      } else {
        const newProductResponse = await axios.post(
          "http://localhost:4000/api/product/product/add",
          {
            title:title,
            description: description,
            image: uploadedImageUrls,
            animaltag: selectedAnimalTag,
            producttag: selectedProductTag,
            price: parseFloat(parseFloat(priceString).toFixed(2)),
            ratings: rating,
            comments: comment,
            stockLevel: 1,
            hidden: false,
          }
        );

        if (newProductResponse.status === 200) {
          const newProduct = newProductResponse.data;
          dispatch(addProduct(newProduct));
          navigate(-1);
        } else {
          console.error("Error adding product:", newProductResponse.statusText);
          alert("Error adding pet. Please try again later.");
        }
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      alert("Error uploading image. Please try again later.");
    }
  };
    
  const triggerFileInput = () => {
    if (currentImageIndex === -1 || images.length === 0) {
      document.querySelector('input[type="file"]').click();
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
    setImages([...images, ...newImages]);
    setCurrentImageIndex(images.length + newImages.length - 1);

    const newFiles = [...uploadedFiles, ...Array.from(e.target.files)];
    setUploadedFiles(newFiles);
  };

  const navigateImage = (direction, e) => {
    e.stopPropagation();

    if (images.length === 0) {
      setCurrentImageIndex(-1);
      return;
    }

    let newIndex = currentImageIndex;
    if (direction === 'prev') {
      newIndex = currentImageIndex === -1 ? images.length - 1 : currentImageIndex > 0 ? currentImageIndex - 1 : images.length - 1;
    } else if (direction === 'next') {
      newIndex = currentImageIndex < images.length - 1 ? currentImageIndex + 1 : -1;
    }
    setCurrentImageIndex(newIndex);
  };

  const displayContent = () => {
    if (currentImageIndex === -1) {
      return <div className="placeholder">Click to add image</div>;
    }
  
    // Check if the image source is from the file explorer or already a URL
    const imageUrl = images[currentImageIndex];
    const isImageFromFileExplorer = imageUrl.startsWith('blob:'); // Assuming file explorer URLs start with 'blob:'
    const isRemoteImage = imageUrl.startsWith('http');
  
    if (isImageFromFileExplorer || isRemoteImage) {
      return (
        <img
          src={imageUrl}
          alt="Product for sales"
          style={{ maxWidth: '100%', maxHeight: '100%' }}
        />
      );
    } else {
      if (images.length === 0) {
        return null;
      } else if (images.length === 1) {
        return (
          <img
            src={require(`../assets/images/${images[0]}`)}
            alt="Product for sales"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        );
      } else if (images.length === 2) {
        return (
          <>
            {currentImageIndex === 0 && (
              <img
                src={require(`../assets/images/${images[0]}`)}
                alt="Product for sales"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
            {currentImageIndex === 1 && (
              <img
                src={require(`../assets/images/${images[1]}`)}
                alt="Product for sales"
                style={{ maxWidth: "100%", maxHeight: "100%" }}
              />
            )}
          </>
        );
      } else {
        return (
          <img
            src={require(`../assets/images/${images[currentImageIndex]}`)}
            alt="Product for sales"
            style={{ maxWidth: "100%", maxHeight: "100%" }}
          />
        );
      }
    }
  };
  
  const extractImageFileName = (imageUrl) => {
    // Check if the imageUrl starts with "http://localhost:4000/image/"
    if (imageUrl.startsWith("http://localhost:4000/image/")) {
      // Get the substring starting after "http://localhost:4000/image/"
      return imageUrl.substring("http://localhost:4000/image/".length);
    } else {
      // If the imageUrl format doesn't match, return the original imageUrl
      return imageUrl;
    }
  };
  
  const handleDeleteImage = () => {
    if (editMode && currentImageIndex !== -1) {
      const imageFileName = extractImageFileName(images[currentImageIndex]); // Get the filename of the image to be deleted
  
      // Add the filename to the imagesToDelete array
      setImagesToDelete([...imagesToDelete, imageFileName]);
  
      // Remove the image from the images array
      const updatedImages = images.filter((_, index) => index !== currentImageIndex);
      setImages(updatedImages);
      setCurrentImageIndex(updatedImages.length > 0 ? 0 : -1);
    } else {
      // Handle deletion from local state only (not in edit mode)
      if (currentImageIndex !== -1) {
        const updatedImages = images.filter((_, index) => index !== currentImageIndex);
        setImages(updatedImages);
        setCurrentImageIndex(updatedImages.length > 0 ? 0 : -1);
      }
    }
  };

  return (
    <div>
      <div className="image-uploader-container" onClick={triggerFileInput}>
        <div className="image-container">
          {displayContent()}
          {currentImageIndex !==-1 && 
            <div className="image-overlay">
              <button className="delete-button" onClick={handleDeleteImage}>Delete Image</button>
            </div>
          }
        </div>
        <div className="overlay-controls">
          <button className="nav-button prev-button" onClick={(e) => navigateImage('prev', e)} disabled={images.length === 0 && currentImageIndex === -1}>{'<'}</button>
          <div className="pagination-dots">
            {images.map((_, index) => (
              <span key={index} className={`pagination-indicator ${index === currentImageIndex ? 'current' : ''}`} onClick={() => setCurrentImageIndex(index)}>•</span>
            ))}
          </div>
          <button className="nav-button next-button" onClick={(e) => navigateImage('next', e)} disabled={images.length === 0 && currentImageIndex === -1}>{'>'}</button>
          
        </div>
        <input type="file" accept="image/*" multiple onChange={handleImageChange} style={{ display: 'none' }} />
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
            <span className="Product-details-form-title">{title || "Title"}</span>
          )}
        </div>
        <div onClick={toggleDescription}>
          <br />
          <span className="Product-details-form-description">Description: </span>
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
        <div className="Product-details-form-product-categories-container">
          <span className="Product-details-form-product-categories-animal">Animal type: </span>
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
        <div className="Product-details-form-product-categories-container">
          <span className="Product-details-form-product-categories-producttype">Product type:  </span>
          <button
              className={`Product-details-form-product-categories-button ${
                  isFoodFocused ? "focused" : ""
              } accessories`}
              onClick={() => toggleSelectedProductTag("food")}
              >
              Food
              </button>
              <button
              className={`Product-details-form-product-categories-button ${
                  isAccessoriesFocused ? "focused" : ""
              } accessories`}
              onClick={() => toggleSelectedProductTag("accessories")}
              >
              Accessories
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
              onChange={(e) => setPrice(e.target.value)}
            />
          ) : (
            <span className="Product-details-form-price-content">
              {price || " XX"}
            </span>
          )}
        </div>
        <div className="Product-details-form-add-back-button">
          <button id="Product-details-form-add-button" onClick={handleOnAddProductClick}>
            <svg
              id="Product-details-form-add-button-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="17"
              viewBox="0 0 25 24"
              fill="none"
            >
              <path
                d="M19.6875 15.1247H5.32812C5.15625 15.1247 5.01562 15.2794 5.01562 15.4684L5.01172 17.531C5.01172 17.7201 5.15234 17.8748 5.32422 17.8748H19.6875C19.8594 17.8748 20 17.7201 20 17.531V15.4684C20 15.2794 19.8594 15.1247 19.6875 15.1247ZM19.6875 19.2499H5.31641C5.14453 19.2499 5.00391 19.4046 5.00391 19.5936L5 21.6562C5 21.8453 5.14062 22 5.3125 22H19.6875C19.8594 22 20 21.8453 20 21.6562V19.5936C20 19.4046 19.8594 19.2499 19.6875 19.2499ZM19.6875 10.9995H5.33594C5.16406 10.9995 5.02344 11.1542 5.02344 11.3432L5.01953 13.4058C5.01953 13.5949 5.16016 13.7496 5.33203 13.7496H19.6875C19.8594 13.7496 20 13.5949 20 13.4058V11.3432C20 11.1542 19.8594 10.9995 19.6875 10.9995ZM23.8477 5.02652L13.2188 0.157921C12.9903 0.0536643 12.7454 0 12.498 0C12.2507 0 12.0058 0.0536643 11.7773 0.157921L1.15234 5.02652C0.457031 5.3488 0 6.09649 0 6.93013V21.6562C0 21.8453 0.140625 22 0.3125 22H3.4375C3.60938 22 3.75 21.8453 3.75 21.6562V10.9995C3.75 10.2432 4.32031 9.6244 5.02344 9.6244H19.9766C20.6797 9.6244 21.25 10.2432 21.25 10.9995V21.6562C21.25 21.8453 21.3906 22 21.5625 22H24.6875C24.8594 22 25 21.8453 25 21.6562V6.93013C25 6.09649 24.543 5.3488 23.8477 5.02652Z"
                fill="white"
              />
            </svg>
            {editMode?
              <span id="Product-details-form-add-button-text">Save</span>
              :<span id="Product-details-form-add-button-text">Add</span>}
          </button>
          <Link to={`/product/sellerProduct`} id="Product-details-form-back-button">
              Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;