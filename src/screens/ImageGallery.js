import './ImageGallery.css';

import React, { useState } from 'react';

function ImageGallery() {

    const [images, setImages] = useState([
        // Your image data here
      ]);
      
      return (
      <div className="image-gallery">
      <div className="gallery-item feature-image">
        <img src="feature-image.jpg" alt="FeaturedImage" />
      </div>
      <div className="gallery-item">
        <img src="image1.jpg" alt="Image1" />
      </div>
      <div className="gallery-item">
        <img src="image2.jpg" alt="Image2" />
      </div>
      <div className="gallery-item">
        <img src="image3.jpg" alt="Image3" />
      </div>
      <div className="gallery-item">
        <img src="image4.jpg" alt="Image4" />
      </div>
      <div className="gallery-item">
        <img src="image5.jpg" alt="Image5" />
      </div>
      </div>
    );
  }
  
  export default ImageGallery;