import React, { useState, useEffect } from "react";
import { ImBin2, ImPencil } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineFileAdd } from "react-icons/ai";
import "./style.css";

export default function ToDoList() {
  // state that saves the todo items
  const [todoItems, setTodoItems] = useState(
    localStorage.getItem("my-to-do-items")
      ? JSON.parse(localStorage.getItem("my-to-do-items"))
      : []
  );
  // state that saves the value of the input field
  const [inputField, setInputField] = useState("");
  // state that saves if it's a new todo or edit
  const [editItemIdx, setEditItemIdx] = useState(-1);
  // state that
  const [isCompleted, setIsCompleted] = useState("all");
  // search field
  const [searchField, setSearchField] = useState("");

  // function that changes the "isCompleted" status
  const complete = (id) => {
    setTodoItems((currentState) =>
      currentState.map(item =>
        id === item.id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };
  // function that deletes the item from the list (i.e. update the todo items state)
  const deleteItem = (id) => {
    setTodoItems((currentState) =>
      currentState.filter((item) => item.id !== id)
    );
  };
  //  edit function
  const editItem = (item) => {
    setEditItemIdx(item.id);
    setInputField(item.title);
  };

  // submit function, that takes the input field value and add it to the todo items state

  const submit = (e) => {
    if (editItemIdx === -1) {
      setTodoItems((currentState) => {
        return [
          ...currentState,
          {
            id: Math.floor(Math.random() * 100000),
            title: inputField,
            createdDate: new Date().toUTCString(),
            isCompleted: false,
          },
        ];
      });
    } else {
      setTodoItems((currentState) => {
        return currentState.map((item) => {
          return item.id === editItemIdx
            ? { ...item, title: inputField }
            : item;
        });
      });
    }
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditItemIdx(-1);
    setInputField("");
  };

  useEffect(() => {
    const localStorageData = localStorage.getItem("my-to-do-items");
    if (localStorageData) {
      setTodoItems(JSON.parse(localStorageData));
    } else {
      localStorage.setItem("my-to-do-items", []);
    }
  }, []);

  // SAVE to localStorage
  useEffect(() => {
    console.log("todoitems updated");
    localStorage.setItem("my-to-do-items", JSON.stringify(todoItems));
  }, [todoItems]);

  return (
    <div className="todo-container">
      {/* calls the submit function */}
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          inputField.length !== 0 ? submit(e) : alert("FIELD IS EMPTY");
        }}
      >
        <label>
          <input
            value={inputField} //read from the state
            onChange={(e) => setInputField(e.target.value)} //  update the state
          />
        </label>
        <button className="submit-btn" type="submit">
          {editItemIdx === -1 ? (
            <AiOutlineFileAdd style={{ color: "white" }} />
          ) : (
            <BiSave style={{ color: "white" }} />
          )}
        </button>
      </form>

      <div className="todos">
        <span>The Todos</span>
        <div>
          <label>
            Search:
            <input
              value={searchField} //read from the state
              onChange={(e) => setSearchField(e.target.value)} //  update the state
            />
          </label>
          {["all", "completed", "inCompleted"].map((btnName) => {
            return (
              <button
                className="filter-btn"
                onClick={() => {
                  setIsCompleted(btnName);
                }}
              >
                {btnName}
              </button>
            );
          })}

        </div>

        {todoItems
          .filter((item) => {
            return isCompleted === "completed"
              ? item.isCompleted && item.title.includes(searchField)
              : isCompleted === "inCompleted"
              ? !item.isCompleted && item.title.includes(searchField)
              : item.title.includes(searchField);
          })
          .map((item) => {
            return (
              <div className="todo" key={item.id}>
                <div>
                  <div
                    className={item.isCompleted ? "completed" : ""}
                    style={{ fontSize: "20px" }}
                  >
                    {item.title}
                  </div>
                  <div
                    style={{ fontSize: "16px" }}
                  >{`created: ${item.createdDate}`}</div>
                </div>

                {editItemIdx !== item.id ? (
                  <div className="todo-btns">
                    <button onClick={() => complete(item.id)}>
                      <AiOutlineCheckCircle
                        style={item.isCompleted && { color: "green" }}
                      />
                    </button>

                    <button onClick={() => editItem(item)}>
                      <ImPencil style={{ color: "blue" }} />
                    </button>

                    <button onClick={() => deleteItem(item.id)}>
                      <ImBin2 style={{ color: "red" }} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      cancelEdit();
                    }}
                  >
                    Cancel
                  </button>
                )}
              </div>
            );
          })}
      </div>
    </div>
  );
}
