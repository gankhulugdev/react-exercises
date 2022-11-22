import React, { useState, useEffect } from "react";
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
  const [editEmployee, setEditEmployee] = useState(null);

  //effect hook
  useEffect(() => {
    localStorage.setItem("employeeList", JSON.stringify(employeeList));
    setEditEmployee(null);
  }, [employeeList]);

  return (
    <div className="main-container">
      <div >
        <Form
          setEmployeeList={setEmployeeList}
          editEmployee={editEmployee}
        />
      </div>

      <div className="cards">
        {employeeList.map((employee, employeeIdx) => {
          return (
            <Card
              setEmployeeList={setEmployeeList}
              setEditEmployee={setEditEmployee}
              employee={employee}
              key={employeeIdx}
              editEmployee={editEmployee}
            />
          );
        })}
      </div>
    </div>
  );
};

export default EmployeeList;
