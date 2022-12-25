import React from "react";
import "./kahoot.css";
import { Col } from "antd";
import { FaCheck, FaTimes } from "react-icons/fa";

const Answer = ({ answer, question, updateData, id, time }) => {
  return (
    <Col className="gutter-row" span={12}>
      <div
        style={{
          backgroundColor:
            (question.answered || time < 0) &&
            (answer.isCorrect ? "#66bf39" : "#fe3355"),
        }}
        onClick={() => {
          !question.answered &&
            time >= 0 &&
            updateData({ type: "checkAnswer", data: {isCorrect: answer.isCorrect, time} });
        }}
        className={`bg-${buttonTypes[id].bgColor} answer`}
      >
        <div>
          {buttonTypes[id].svg}
          {answer.answer}
        </div>

        {(question.answered || time < 0) &&
          (answer.isCorrect ? <FaCheck /> : <FaTimes />)}
      </div>
    </Col>
  );
};

export default Answer;

const buttonTypes = [
  {
    svg: (
      <svg width={30} viewBox="0 0 32 32">
        <path
          d="M27,24.559972 L5,24.559972 L16,7 L27,24.559972 Z"
          style={{ fill: "white" }}
        />
      </svg>
    ),
    bgColor: "red",
  },
  {
    svg: (
      <svg width={30} viewBox="0 0 32 32">
        <path
          d="M4,16.0038341 L16,4 L28,16.0007668 L16,28 L4,16.0038341 Z"
          style={{ fill: "white" }}
        />
      </svg>
    ),
    bgColor: "blue",
  },
  {
    svg: (
      <svg width={30} viewBox="0 0 32 32">
        <path
          d="M16,27 C9.92486775,27 5,22.0751322 5,16 C5,9.92486775 9.92486775,5 16,5 C22.0751322,5 27,9.92486775 27,16 C27,22.0751322 22.0751322,27 16,27 Z"
          style={{ fill: "white" }}
        />
      </svg>
    ),
    bgColor: "yellow",
  },
  {
    svg: (
      <svg width={30} viewBox="0 0 32 32">
        <path d="M7,7 L25,7 L25,25 L7,25 L7,7 Z" style={{ fill: "white" }} />
      </svg>
    ),
    bgColor: "green",
  },
];
