import React, { useState } from 'react';
import '../styles/ImageUploader.css';

const ImageUploader = () => {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(-1);
  

  const triggerFileInput = () => {
    if (currentImageIndex === -1 || images.length === 0) {
      document.querySelector('input[type="file"]').click();
    }
  };

  const handleImageChange = (e) => {
    const newImages = Array.from(e.target.files).map((file) => URL.createObjectURL(file));
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
    return <img src={images[currentImageIndex]} alt={`Image ${currentImageIndex + 1}`} style={{ maxWidth: '100%', maxHeight: '100%' }} />;
  };

  const handleDeleteImage=()=>{
    if (currentImageIndex !== -1) {
      const updatedImages = images.filter((image, index) => index !== currentImageIndex);
      setImages(updatedImages);
      setCurrentImageIndex(updatedImages.length > 0 ? 0 : -1); // Set current index to the first image if there are remaining images, otherwise to -1
    }
  }

  return (
    <div className="image-uploader-container" onClick={triggerFileInput}>
      <div className="image-container">
        {displayContent()}
        {currentImageIndex !== -1 && (
        <div className="image-overlay">
          <button className="delete-button" onClick={handleDeleteImage}>Delete Image</button>
        </div>
      )}
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
  );
};

export default ImageUploader; 