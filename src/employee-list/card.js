import React from "react";
import {RiDeleteBin5Fill} from "react-icons/ri"
import {CiEdit} from "react-icons/ci"
const Card = ({ setEmployeeList, employee, setEditId, editId }) => {
  return (
    <div className="card">
      <div className="user-info">
      <img
          src={employee.icon}
          alt={employee.icon}
          style={{ margin: "1rem", borderRadius: "50%", width: "100px", height: "100px" }}
        />
        <div style={{marginBottom: "1rem",fontSize : '1.5rem', fontWeight: "600"}}>{`${employee.firstname} ${employee.lastname}`}</div>
        <div>{employee.role}</div>
        <div style={{fontSize: "1.2rem", fontWeight: "500"}}>{employee.company}</div>
        <div>{`${employee.address}, ${employee.aptsuite}`}</div>
        <div>{`${employee.city}, ${employee.state} ${employee.zip}`}</div>
        <div>{`P: ${employee.phone}`}</div>
        
      </div>
      <div className="buttons">
        {editId === employee.id ? (
          <button className="button"
            onClick={() => {
              setEditId(-1);
            }}
          >
            Cancel
          </button>
        ) : (
          <div>
            <button  className="button" style={{color: 'blue'}}
              onClick={() => {
                setEditId(employee.id);
              }}
            >
             <CiEdit/> edit
            </button>
            <button className="button"
            style={{color: "red"}}
              onClick={() => {
                setEmployeeList((currState) =>
                  currState.filter((item) => item.id !== employee.id)
                );
                setEditId(-1);
              }}
            >
              <RiDeleteBin5Fill/> delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;
