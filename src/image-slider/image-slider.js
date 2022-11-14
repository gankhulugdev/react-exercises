import React, { useState } from "react";
import "./image-slider.css";
import pic1 from "./assets/1.jpg";
import pic2 from "./assets/2.jpg";
import pic3 from "./assets/3.jpg";
import pic4 from "./assets/4.jpg";
import pic5 from "./assets/5.jpg";
import pic6 from "./assets/6.jpg";
import pic7 from "./assets/7.jpg";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";

const ImageSlider = () => {
  const [currentImageIdx, setCurrentImageIdx] = useState(0);
  const [images, setImages] = useState(pictures);

  return (
    <div>
      <div className="slider">

        <div className="btns">
        <button
          className="previous-btn"
          onClick={() => {
            setCurrentImageIdx((currentState) => {
              return currentState === 0 ? images.length - 1 : currentState - 1;
            });
          }}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className="next-btn"
          onClick={() => {
            setCurrentImageIdx((currentState) => {
              return currentState === images.length - 1 ? 0 : currentState + 1;
            });
          }}
        >
          <AiOutlineArrowRight />
        </button>
        </div>

        <div className="dots">
          {images.map((image, imageIdx)=>{
            return (
            <button onClick={()=>{
                setCurrentImageIdx(imageIdx)
            }} key={imageIdx} className={`${imageIdx === currentImageIdx && "selectedDot"} dot`}></button>
            )
            
          })}
        </div>
        
        <img className="slidePic" alt={images[currentImageIdx]} src={images[currentImageIdx]} />
      </div>
    </div>
  );
};

const pictures = [pic1, pic2, pic3, pic4, pic5, pic6, pic7];
export default ImageSlider;
