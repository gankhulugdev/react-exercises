import React, { useState } from "react";
import { BsToggleOff } from "react-icons/bs";
import { BsToggleOn } from "react-icons/bs";

const FireWork = () => {
  const [state, setState] = useState(false);
 

  return (
    <div className="btn" onClick={()=>{
        setState((currentState)=>{
            return currentState = !currentState;
        })
    }}>
      {state ? <BsToggleOn /> : <BsToggleOff/>}
    </div>
  )
};

export default FireWork;
