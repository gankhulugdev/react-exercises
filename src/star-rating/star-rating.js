import React, { useState } from "react";
import Star from "./star";

const stars = [1, 2, 3, 4, 5];

const StarRating = () => {
  const [starCount, setStarCount] = useState(0);

  return (
    <div>
      {stars.map((star, idx) => {
        return starCount >= star ? (
          <span onClick={() => setStarCount(() => star)}>
            <Star key={idx} type="filled" />
          </span>
        ) : (
          <span onClick={() => setStarCount(() => star)}>
            <Star key={idx} />
          </span>
        );
      })}
    </div>
  );
};

export default StarRating;
