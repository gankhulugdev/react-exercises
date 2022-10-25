import React from "react";
import  {IoIosArrowBack} from "react-icons/io"
import {IoIosArrowForward} from "react-icons/io"

const House = (props) => {
  return (
    <div className="house">
       <p className="arrow"><IoIosArrowForward/></p> 
      <img src={props.pic} alt="picture"/>
      <div className="description">
        <div className="leftSideBar">
          <h3 className="location">{props.location}</h3>
          <p className="distance">{props.distance}</p>
          <p className="date">{props.date}</p>
          <h4 className="price">${props.price} night</h4>
        </div>
        <div className="rightSidebar">
            <h3 className="rates"><i class="fa-solid fa-star"></i>{props.rate}</h3>
            
        </div>
      </div>
    </div>
  );
};

export default House;
