import "./App.css";
import { useReducer } from "react";
import { useState } from "react";

const initialState = [
  {
    userId: 1,
    id: 1,
    title: "Buy groceries",
    completed: false,
  },
  {
    userId: 1,
    id: 2,
    title: "Finish homework assignment",
    completed: true,
  },
  {
    userId: 1,
    id: 3,
    title: "Call mom",
    completed: false,
  },
  // Add more todo items as needed
];

function reducer(state, action) {
  switch (action.type) {
    case "ADD_TODO":
      if (action.payload === "") {
        return state;
      }
      let isToDoExist = false;
      state.forEach((e) => {
        if (e.title === action.payload) {
          alert(`There is already a ${action.payload} in your list`);
          isToDoExist = true;
        }
      });

      if (isToDoExist) return state;
      return [
        {
          userId: 1,
          id: state.length + 1,
          title: action.payload,
          complete: false,
        },
        ...state,
      ];

    case "Delete_TODO":
      return state.filter((s) => s.title !== action.payload); // filter push the true to new array
    case "EDIT-TODO":
      return state.map((s) => {
        if (s.id === action.payload.id) {
          return {
            ...s,
            title: action.payload.newTitle,
          };
        } else return s;
      });
    case "TOGGLE_TODO": // Case for toggling completion status
      return state.map((s) => {
        if (s.id === action.payload) {
          return {
            ...s,
            completed: !s.completed, // Toggle completion status
          };
        } else return s;
      });
    default:
      return state;
  }
}

function App() {
  const [todos, dispatch] = useReducer(reducer, initialState);
  const [newTodo, setNewTodo] = useState("");
  const [editTodo, setEditTodo] = useState({ id: null, newTitle: "" });
  const [textInputActive, setTextInputActive] = useState(false);

  return (
    <div className="App">
      <h1>Create to do list</h1>

      <input
        type="text"
        name="addToDo"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
      ></input>
      <button onClick={() => dispatch({ type: "ADD_TODO", payload: newTodo })}>
        Add
      </button>

      <div>
        {todos.map((todo) => {
          return (
            <div className="todoList">
              <input
                type="checkbox"
                id="myCheckbox"
                name="myCheckbox"
                checked={todo.completed}
                onChange={() =>
                  dispatch({ type: "TOGGLE_TODO", payload: todo.id })
                }
              ></input>
              <p>{todo.title}</p>
              <div className="btnDandE">
                <button
                  onClick={() =>
                    dispatch({ type: "Delete_TODO", payload: todo.title })
                  }
                  disabled={!todo.completed}
                  style={{
                    display:
                      textInputActive && todo.id === editTodo.id
                        ? "none"
                        : "inline-block",
                  }}
                >
                  Delete
                </button>
                <button
                  onClick={() => {
                    setEditTodo({ id: todo.id, newTitle: todo.title }); // Update editTodo with id and initial title
                    setTextInputActive(true); // Set textInputActive to true when clicking Edit
                  }}
                  // disabled={textInputActive && todo.id == editTodo.id}
                  style={{
                    display:
                      textInputActive && todo.id === editTodo.id
                        ? "none"
                        : "inline-block",
                  }}
                >
                  Edit
                </button>
              </div>
              <div className="editInput">
                {todo.id === editTodo.id && (
                  <>
                    <input
                      className="editInput"
                      type="text"
                      name="editToDo"
                      value={editTodo.newTitle}
                      onChange={(e) =>
                        setEditTodo({ ...editTodo, newTitle: e.target.value })
                      }
                      style={{
                        display:
                          textInputActive && todo.id === editTodo.id
                            ? "block"
                            : "none",
                      }}
                    ></input>
                    <button
                      onClick={() => {
                        dispatch({
                          type: "EDIT-TODO",
                          payload: {
                            id: editTodo.id,
                            newTitle: editTodo.newTitle,
                          },
                        });
                        setTextInputActive(false); // Set textInputActive to false after saving
                      }}
                      style={{
                        display:
                          textInputActive && todo.id === editTodo.id
                            ? "block"
                            : "none",
                      }}
                    >
                      Save
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
