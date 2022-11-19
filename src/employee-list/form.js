import React, { useState, useEffect } from "react";

const Form = ({
  setEmployeeList,
  employeeList,
  setEditId,
  avatars,
  editId,
}) => {
  const emptyDataForm = {
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
  };

  const [formData, setFormData] = useState(emptyDataForm);

  useEffect(() => {
    if (editId !== -1) {
      employeeList.forEach((emp) => {
        if (editId === emp.id) {
          setFormData(emp);
        }
      });
    } else {
      setFormData(emptyDataForm);
    }
  }, [editId]);

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
    if (editId === -1) {
      setEmployeeList((currState) => [
        ...currState,
        {
          ...formData,
          id: Math.floor(Math.random() * 1000000),
          icon: randomPick(avatars),
        },
      ]);
    } else {
      setEmployeeList(currState =>
        currState.map(employee =>
          editId === employee.id ? { ...employee, ...formData} : employee
        )
      );
      setEditId(-1);
    }

    setFormData(emptyDataForm);
  };

  return (
    <form className="form-container"
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
      
      <button type="submit">{editId === -1 ? "submit" : "save"}</button>
    </form>
  );
};

export default Form;
