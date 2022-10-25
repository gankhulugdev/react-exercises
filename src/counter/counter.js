import React, { useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const keys = [1, 10, -1, -10];

  return (
    <div>
      <pre>{count}</pre>

      {keys.map((key, id) => {
        return (
          <button onClick={() => setCount((currentState) => currentState + key)}
          >{key > 0 ? "+" + key : key}
          </button>
        );
      })}
    </div>
  );
};

export default Counter;
