import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./github.css"

const GitHub = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("./badishd-icodice-edu");
  }, []);

  return <div></div>;
};

export default GitHub;
