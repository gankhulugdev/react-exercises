import React, { useState } from "react";

const DemoUseState = () => {
  // age variable, setter function
  const [ageJamiya, setAge] = useState(18);
  const [address, setAddress] = useState("Ulaanbaatar");

  // adding age function
  const ageUpAge = () => {
    console.log("Jamiya is getting older");
    // set new value
    setAge((currentSate) => {
      return currentSate + 1;
    });
  };


  return (
    <div>
      <div>Jamiya is {ageJamiya} years old!</div>

      <div>Jamiya is from {address}</div>
      <button onClick={ageUpAge}>Age up Jamiya</button>
      <button onClick={()=> setAddress('Chicago')}>Change address</button>
    </div>
  );
};
export default DemoUseState;
