import React, { useState } from "react";
import { ImBin2, ImPencil } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineFileAdd } from "react-icons/ai";
import "./style.css";

export default function ToDoList() {
  // create a state that saves the todo items
  const [todoItems, setTodoItems] = useState([]);
  // create a state that saves the value of the input field
  const [inputField, setInputField] = useState("");
  // create a state that saves if it's a new todo or edit

  const [editItemIdx, setEditItemIdx] = useState(-1);

  // create a function that changes the "isCompleted" status
  const complete = (itemIdx) => {
    setTodoItems((currentState) =>
      currentState.map((item, id) =>
        itemIdx === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };
  // create a function that deletes the item from the list (i.e. update the todo items state)
  const deleteItem = (itemIdx) => {
    setTodoItems((currentState) =>
      currentState.filter((item, itemId) => itemId !== itemIdx)
    );
  };
  // create an edit function - better to do it at the end
  const editItem = (itemIdx) => {
    setEditItemIdx(itemIdx);
    setInputField(todoItems[itemIdx].title);
  };

  // create a submit function, that takes the input field value and add it to the todo items state

  const submit = (e) => {
    if(editItemIdx=== -1) {
      setTodoItems((currentState)=> {
        return [...currentState, {
          title: inputField,
          createdDate: new Date().toUTCString(),
          isCompleted: false,
        }]
      })
    }else{
      setTodoItems((currentState)=>{
        return currentState.map((item,id)=>{
          return id === editItemIdx ? { ...item, title: inputField } : item;
        })
      })
    }
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditItemIdx(-1);
    setInputField("")
  }

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
            value={inputField} //should read from the state
            onChange={(e) => setInputField(e.target.value)} // should update the state
          />
        </label>
        <button className="submit-btn" type="submit">
          {editItemIdx===-1 ? (
            <AiOutlineFileAdd style={{ color: "white" }} />
          ) : (
            <BiSave style={{ color: "white" }} />
          )}
        </button>
      </form>
      {/** list of to do items container */}
      <div className="todos">
        <span>The Todos</span>
        {todoItems.map((item, itemIdx) => {
          return (
            <div className="todo" key={itemIdx}>
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

              {editItemIdx !== itemIdx ? (
                <div className="todo-btns">
                  <button onClick={() => complete(itemIdx)}>
                    <AiOutlineCheckCircle
                      style={item.isCompleted && { color: "green" }}
                    />
                  </button>

                  <button onClick={() => editItem(itemIdx)}>
                    <ImPencil style={{ color: "blue" }} />
                  </button>

                  <button onClick={() => deleteItem(itemIdx)}>
                    <ImBin2 style={{ color: "red" }} />
                  </button>
                </div>
              ) : (
                <button onClick={()=>{cancelEdit()}}>Cancel</button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
