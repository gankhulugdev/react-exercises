import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./style.css"

const SideBarMenu = () => {
  const navigate = useNavigate();
  return (
    <div className="side-bar-container">
      <div className="left-side-bar">
        {[
          "Air-bnb",
          "BMI",
          "Clock",
          "Color-Picker",
          "ToDo-List",
          "Counter",
          "Employee-List",
          "Image-Slider",
          "Language-Picker",
          "Memory-Game",
          "Profile-Card",
          "Star-Rating",
          "Status-Picker",
          "Tic-Tac-Toe",
          "Api-Call",
          "Joke",
          "Github-Profile",
          "Movie",
          "Counter-Reducer",
          "Shop"
        ].map((name, nameIdx) => {
          return (
            <button className="navi-btn"
            key={nameIdx}
              onClick={() => {
                navigate(`/${name.toLowerCase()}`);
              }}
            >
              {name}
            </button>
          );
        })}
      </div>

      <Outlet />
    </div>
  );
};

export default SideBarMenu;
