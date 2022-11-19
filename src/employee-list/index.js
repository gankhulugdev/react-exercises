import React, { useState, useEffect } from "react";
import avatar1 from "./assets/avatar1.png";
import avatar2 from "./assets/avatar2.png";
import avatar3 from "./assets/avatar3.png";
import avatar4 from "./assets/avatar4.png";
import avatar5 from "./assets/avatar5.png";
import avatar6 from "./assets/avatar6.png";
import avatar7 from "./assets/avatar7.png";
import avatar8 from "./assets/avatar8.png";
import Card from "./card";
import Form from "./form";
import "./style.css";

const EmployeeList = () => {
  //states

  const [employeeList, setEmployeeList] = useState(
    localStorage.getItem("employeeList")
      ? JSON.parse(localStorage.getItem("employeeList"))
      : []
  );
  const [editId, setEditId] = useState(-1);

  //effect hook
  useEffect(() => {
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
  }, [employeeList]);

  return (
    <div className="main-container">
      <div >
        <Form
          setEmployeeList={setEmployeeList}
          employeeList={employeeList}
          setEditId={setEditId}
          avatars={avatars}
          editId={editId}
        />
      </div>

      <div className="cards">
        {employeeList.map((employee, employeeIdx) => {
          return (
            <Card
              setEmployeeList={setEmployeeList}
              setEditId={setEditId}
              employee={employee}
              key={employeeIdx}
              editId={editId}
            />
          );
        })}
      </div>
    </div>
  );
};

const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
];

export default EmployeeList;
