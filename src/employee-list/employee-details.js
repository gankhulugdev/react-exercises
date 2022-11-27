import React from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";

const EmployeeDetails = () => {
  const { employeeId } = useParams();
  const { state } = useLocation();
  const navigate = useNavigate();

  const employee = state.find(({ id }) => id === parseInt(employeeId));

  return (
    <div className="card-employee">
      <button style={{color: 'black', border: 'none', backgroundColor: '#f2e9e4'}}
        onClick={() => {
          navigate(-1);
        }}
      >
        back to list
      </button>

      <div className="user-info">
        <img
          src={employee.icon}
          alt={employee.icon}
          style={{
            margin: "1rem",
            borderRadius: "10%",
            width: "200px",
            height: "200px",
          }}
        />
        <div
          style={{
            marginBottom: "1rem",
            fontSize: "1.5rem",
            fontWeight: "600",
          }}
        >{`${employee.firstname} ${employee.lastname}`}</div>
        <div>{employee.role}</div>
        <div style={{ fontSize: "1.2rem", fontWeight: "500" }}>
          {employee.company}
        </div>
        <div>{`${employee.address}, ${employee.aptsuite}`}</div>
        <div>{`${employee.city}, ${employee.state} ${employee.zip}`}</div>
        <div>{`P: ${employee.phone}`}</div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
