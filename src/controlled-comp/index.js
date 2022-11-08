import React, { useState } from "react";
import { ImBin2, ImPencil } from "react-icons/im";
import { BiSave } from "react-icons/bi";
import { AiOutlineCheckCircle, AiOutlineFileAdd } from "react-icons/ai";
import "./style.css";

export default function ToDoList() {
  // state that saves the todo items
  const [todoItems, setTodoItems] = useState([]);
  // state that saves the value of the input field
  const [inputField, setInputField] = useState("");
  // state that saves if it's a new todo or edit
  const [editItemIdx, setEditItemIdx] = useState(-1);
  // state that 
  const [isCompleted, setIsCompleted] = useState('')
  // search field
  const [searchField, setSearchField] = useState('')


  // function that changes the "isCompleted" status
  const complete = (itemIdx) => {
    console.log(itemIdx)
    setTodoItems((currentState) =>
      currentState.map((item, id) =>
        itemIdx === id ? { ...item, isCompleted: !item.isCompleted } : item
      )
    );
  };
  // function that deletes the item from the list (i.e. update the todo items state)
  const deleteItem = (itemIdx) => {
    setTodoItems((currentState) =>
      currentState.filter((item, itemId) => itemId !== itemIdx)
    );
  };
  //  edit function - better to do it at the end
  const editItem = (itemIdx) => {
    setEditItemIdx(itemIdx);
    setInputField(todoItems[itemIdx].title);
  };

  // submit function, that takes the input field value and add it to the todo items state

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
            value={inputField} //read from the state
            onChange={(e) => setInputField(e.target.value)} //  update the state
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
            {/* save changes in localStorage  */}

            {/* <button onClick={()=>{
              localStorage.setItem('toDoList',)
            }}>Save in localStorage</button> */}

      {/** list of to do items container */}
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
       
           <button className="filter-btn" onClick={()=>{setIsCompleted('')}}>all</button>
           <button className="filter-btn" onClick={()=>{setIsCompleted('completed')}}>completed</button>
           <button className="filter-btn" onClick={()=>{setIsCompleted('inCompleted')}}>incompleted</button>
        </div>
       
        {todoItems.filter((item)=>{
          //  return item.title.includes(searchField)
           return isCompleted === 'completed' ? (item.isCompleted && item.title.includes(searchField))  :isCompleted === 'inCompleted' ? (!item.isCompleted && item.title.includes(searchField)) : (item.title.includes(searchField))
          
         
        }).map((item, itemIdx) => {
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
