import React, { useState } from "react";

const DemoObject = () => {
  const [bootCamp, setBootCamp] = useState({
    studentCount: 13,
    isPartTime: true,
    isFinished: false,
  });

  return (
    <div>
      <pre>{JSON.stringify(bootCamp, null, 2)}</pre>
      {/* if(bootCamp.isFinished) do your home work */}
      {bootCamp.isFinished && <div>Do your home work</div>}

      <button
        onClick={() => {
          setBootCamp((currState) => ({
            ...currState,
            isFinished: !currState.isFinished,
          }));
          // if(bootCamp.isFinished)
        }}
      >
        {bootCamp.isFinished ? "Finished" : "Finish class"}
      </button>
    </div>
  );
};

export default DemoObject;
