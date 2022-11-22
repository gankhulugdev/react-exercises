import React, { useState } from "react";
import "./style.css";
import {
  Area,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const BMI = () => {
  const [measure, setMeasure] = useState("metric");
  const [bmiData, setBmiData] = useState([]);
  const [viewRange, setViewRange] = useState(7);

  const [formData, setFormData] = useState({
    height: "",
    weight: "",
  });

  const filter = (arr, amountOfDays) => {

    const result = [];
    if (arr.length >= amountOfDays) {
      for (let i = arr.length - amountOfDays; i < arr.length; i++) {
        result.push(arr[i]);
      }
    } else {
      return arr;
    }

    return result;
  };

  const onFormChange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;
    setFormData((currState) => ({ ...currState, [fieldName]: fieldValue }));
  };

  const submit = () => {
    setBmiData((currState) => [
      ...currState,
      {
        date: new Date().toDateString(),
        bmi:
          measure === "metric"
            ? formData.weight / (formData.height / 100) ** 2
            : (703 * formData.weight) / formData.height ** 2,
      },
    ]);
  };

  return (
    <div className="bmi-container">
      <div>
        <button
          className="measure-btn"
          onClick={() => {
            setMeasure("standart");
          }}
        >
          standart
        </button>
        <button
          className="measure-btn"
          onClick={() => {
            setMeasure("metric");
          }}
        >
          metric
        </button>
      </div>

      <div>
        <form
          className="form-container"
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
        >
          <div className="input-fields">
            <label>
              Height: {measure === "metric" ? " in centimeters" : " in inches"}
              <br />
              <input
                required
                name="height"
                value={formData["height"]}
                onChange={(e) => {
                  onFormChange(e);
                }}
              />
            </label>
            <label>
              Weight: {measure === "metric" ? " in kilogramms" : " in pounds"}
              <br />
              <input
                required
                name="weight"
                value={formData["weight"]}
                onChange={(e) => {
                  onFormChange(e);
                }}
              />
            </label>
          </div>

          <button className="submit-btn" type="submit">
            calculate BMI
          </button>
        </form>

        <div className="range-btns">
          {[7, 14, 30].map((range, idx) => {
            return (
              <button
                className="range-btn"
                key={idx}
                onClick={() => {
                  setViewRange(range);
                }}
              >{`${range} days`}</button>
            );
          })}

          <button
            className="range-btn"
            onClick={() => {
              setViewRange(bmiData.length);
            }}
          >
            all
          </button>
        </div>

        <ResponsiveContainer width="100%" aspect={3}>
          <AreaChart width={300} height={100} data={filter(bmiData, viewRange)}>
            <defs>
              <linearGradient id="colorIbm" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis dataKey="bmi" />
            <Legend />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="bmi"
              stroke="#8884d8"
              fillOpacity={1}
              fill="url(#colorIbm)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default BMI;
