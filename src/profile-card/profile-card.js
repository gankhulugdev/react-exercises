import React from "react";
import Profile from "./profile";

const people = [
  {
    name: "Gankhulug Bayarsaikhan",
    title: "Senior Fullstack"
  },
  {
    name: "Tony Stark",
    title: "Owner Operator"
  },
  {
    name: "Begenutei Gankhulug",
    title: "CEO"
  }
];

const ProfileCard = () => {
  return (
    <div>
      {people.map((person, idx) => {
        return <Profile key={idx} name={person.name} title={person.title} />;
      })}
    </div>
  );
};

export default ProfileCard;
