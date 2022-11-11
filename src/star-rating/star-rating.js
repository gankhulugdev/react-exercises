import React, { useState } from "react";
import Star from "./star";

const stars = [1, 2, 3, 4, 5];

const StarRating = () => {
  const [starCount, setStarCount] = useState(0);
  
  return (
    <div>
      {stars.map((star, idx) => {
        return  (
          <span key={idx} onClick={() => setStarCount(() => star)}>
            <Star key={idx} style={starCount >= star ? "filled" : ""} />
          </span>
        )
      })}
    </div>
  );
};

export default StarRating;
