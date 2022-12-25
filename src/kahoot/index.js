import axios from "axios";
import React, { useEffect, useState, useReducer } from "react";
import Answer from "./answer";
import { Row, Layout, Col } from "antd";
import "./kahoot.css";

const { Header, Footer, Content } = Layout;

const QUESTION_TIME = 30;

const randomOrder = (question) => {
  const optoins = [
    ...question.incorrect_answers.map((incorrect) => ({
      answer: incorrect,
      isCorrect: false,
    })),
    { answer: question.correct_answer, isCorrect: true },
  ];

  return optoins.sort(() => (Math.random() > 0.5 ? -1 : 1));
};

const reducer = (curr, { type, data }) => {

  switch (type) {
    case "fetched":
      return {
        ...curr,
        questions: data.map((q) => {
          return {
            question: q.question,
            answers: [...randomOrder(q)],
            answered: "",
          };
        }),
      };
    case "next":
      return { ...curr, current: curr.current + 1 };
    case "checkAnswer":
      return {
        ...curr,
        questions: curr.questions.map((quest, id) => {
          return id === curr.current
            ? {
                ...quest,
                answered: data.isCorrect ? "true" : "false",
                score:
                  data.isCorrect &&
                  Math.round(
                    (1 - (QUESTION_TIME - data.time) / QUESTION_TIME / 2) * 1000
                  ),
              }
            : quest;
        }),
        totalScore: data.isCorrect
          ? curr.totalScore +
            Math.round(
              (1 - (QUESTION_TIME - data.time) / QUESTION_TIME / 2) * 1000
            )
          : curr.totalScore,
      };

    default:
      return curr;
  }
};

const Kahoot = () => {
  const [data, updateData] = useReducer(reducer, {
    questions: [],
    current: 0,
    totalScore: 0,
  });

  const [time, setTime] = useState(QUESTION_TIME);

  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime((curr) => {
        return curr - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  useEffect(() => {
    setTime(QUESTION_TIME);
  }, [data.current]);

  useEffect(() => {
    axios
      .get("https://opentdb.com/api.php?amount=10&category=18&difficulty=easy")
      .then((res) => {
        if (res.status === 200) {
          updateData({ type: "fetched", data: res.data.results });
        }
      })
      .catch((err) => {})
      .finally(() => {});
  }, []);

  return (
    <div className="kahoot-container">
      <Layout
        style={{
          height: "100vh",
          width: "90vw",
          backgroundImage:
            "url('https://images-cdn.kahoot.it/acf73135-050e-4126-b172-d0dbb436012e?auto=webp?auto=webp&width=1800')",
          backgroundSize: "cover",
        }}
      >
        <Header
          style={{
            height: "18vh",
            background: "none",
          }}
        >
          <Row>
            <Col className="current-question-number" span={4}>
              {`${data.current + 1} of ${data.questions.length}`}
            </Col>
            <Col className="current-question" span={16}>
              {data.questions[data.current]?.question}
            </Col>
            <Col className="current-question" span={4}>
              {`Score: ${data.totalScore}`}
            </Col>
          </Row>
        </Header>
        <Layout style={{ background: "none" }}>
          <Content
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              className={`answer-result-frame ${
                data.questions[data.current]?.answered === "true"
                  ? "frame-correct"
                  : data.questions[data.current]?.answered === "false" ||
                    time < 0
                  ? "frame-wrong"
                  : ""
              }`}
            >
              <span
                className={`answer-result ${
                  data.questions[data.current]?.answered === "true"
                    ? "correct-result"
                    : data.questions[data.current]?.answered === "false" ||
                      time < 0
                    ? "wrong-result"
                    : ""
                }`}
              >
                {time < 0 && !data.questions[data.current]?.answered
                  ? "Time's up"
                  : data.questions[data.current]?.answered === "true"
                  ? `Correct ${data.questions[data.current]?.score}`
                  : data.questions[data.current]?.answered === "false"
                  ? "Wrong"
                  : ""}
              </span>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div>
                {time >= 0 && !data.questions[data.current]?.answered && (
                  <div className="time-counter">{time}</div>
                )}
              </div>
              <div>
                {!(time >= 0 && !data.questions[data.current]?.answered) &&
                  data.questions.length - 1 > data.current && (
                    <button
                      className="kahoot-next-btn"
                      onClick={() => {
                        data.questions.length - 1 > data.current &&
                          updateData({ type: "next" });
                      }}
                    >
                      Next
                    </button>
                  )}
              </div>
            </div>
          </Content>
        </Layout>
        <Footer style={{ background: "none", height: "40vh" }}>
          <Row gutter={[16, 16]}>
            {data.questions[data.current]?.answers.map((answer, id) => {
              return (
                <Answer
                  key={id}
                  id={id}
                  question={data.questions[data.current]}
                  updateData={updateData}
                  answer={answer}
                  time={time}
                />
              );
            })}
          </Row>
        </Footer>
      </Layout>
    </div>
  );
};

export default Kahoot;
