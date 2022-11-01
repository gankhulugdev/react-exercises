import React from "react";
import { BiCircle } from "react-icons/bi";
import { ImCross } from "react-icons/im";

const Square = ({isMarked, isCross}) => {
  return isMarked && (isCross ? <ImCross /> : <BiCircle />);
};

export default Square;
