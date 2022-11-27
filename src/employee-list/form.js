import React, { useState, useEffect, useMemo } from "react";
import avatar1 from "./assets/avatar1.png";
import avatar2 from "./assets/avatar2.png";
import avatar3 from "./assets/avatar3.png";
import avatar4 from "./assets/avatar4.png";
import avatar5 from "./assets/avatar5.png";
import avatar6 from "./assets/avatar6.png";
import avatar7 from "./assets/avatar7.png";
import avatar8 from "./assets/avatar8.png";

const Form = ({ setEmployeeList, editEmployee }) => {
  const emptyDataForm = useMemo(()=>{
    return {
      firstname: "",
      lastname: "",
      role: "",
      company: "",
      address: "",
      aptsuite: "",
      city: "",
      state: "",
      zip: "",
      phone: "",
    }
  } ,[])

  const [formData, setFormData] = useState(emptyDataForm);

  useEffect(() => {
    if (editEmployee) {
      setFormData(editEmployee);
    } else {
      setFormData(emptyDataForm);
    }
  }, [editEmployee,emptyDataForm]);

  const onFormchange = (e) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((currState) => {
      return { ...currState, [fieldName]: fieldValue };
    });
  };

  // pick random picture
  const randomPick = (arr) => {
    return arr[Math.floor(Math.random() * arr.length)];
  };

  const submit = () => {
    if (editEmployee === null) {
      setEmployeeList((currState) => [
        ...currState,
        {
          ...formData,
          id: Math.floor(Math.random() * 1000000),
          icon: randomPick(avatars),
        },
      ]);
    } else {
      setEmployeeList((currState) =>
        currState.map((employee) =>
          editEmployee.id === employee.id
            ? { ...employee, ...formData }
            : employee
        )
      );
    }

    setFormData(emptyDataForm);
  };

  return (
    <form
      className="form-container"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      <div className="fields">
        {[
          // {label: 'Forst Name', value: 'fieldName'},
          "First name",
          "Last name",
          "Role",
          "Company",
          "Address",
          "Apt Suite",
          "City",
          "State",
          "Zip",
          "Phone",
        ].map((field, fieldIdx) => {
          const fieldName = field.replace(" ", "").toLowerCase();
          return (
            <label key={fieldIdx}>
              {field}:
              <input
                maxLength="20"
                required
                className="input-field"
                name={fieldName}
                value={formData[fieldName]}
                onChange={(e) => {
                  onFormchange(e);
                }}
              />
            </label>
          );
        })}
      </div>

      <button type="submit" style={{ cursor: "pointer", marginTop: "1rem" }}>
        {editEmployee === null ? "submit" : "save"}
      </button>
    </form>
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

export default Form;
