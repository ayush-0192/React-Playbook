import React, { useEffect, useState } from 'react';
import "./styles.css";

function TodoWithTimeout() {
  // Add your state variables here
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  // Add your useEffect for cleanup here
  /*
  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) => {
          if (todo.isRunning && todo.time > 0) {
            return {
              ...todo,
              time: todo.time - 1,
            };
          }
          if (todo.time === 0) {
            return {
              ...todo,
              isRunning: false,
            };
          }
          return todo
        })
      );
    }, 1000)
    return () => clearInterval(interval)
  },[])
  */

  useEffect(() => {
    const interval = setInterval(() => {
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.isRunning
            ? { ...todo, time: todo.time + 1 }
            : todo
        )
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);


  // Add your helper functions here (formatTime, handleAddTodo, etc.)

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remainingSeconds
    ).padStart(2, "0")}`;
  };

  // Add todo
  const handleAddTodo = () => {
    //console.log(input.trim())
    if (!input.trim()) return;

    const newTodo = {
      id: Date.now(),
      text: input.trim(),
      time: 0,
      isRunning: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  // Start timer
  const handleToggleTimer = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, isRunning: !todo.isRunning }
          : todo
      )
    );
  };
  // Reset timer
  const handleReset = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, time: 0, isRunning: false }
          : todo
      )
    );
  };

  // Delete todo
  const handleDelete = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };


  return (
    <div className="todo-container">
      <h2>Todo with Timer</h2>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          data-testid="todo-input"
          placeholder="Enter todo"
          // Add your value and onChange handlers
          value = {input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className="add-button"
          data-testid="add-button"
          // Add your onClick handler
          onClick = {handleAddTodo}
        >
          Add
        </button>
      </div>

      <ul className="todo-list">
        {todos.map((todo) => (
          <li
            key={todo.id}
            data-testid="todo-item"
            className="todo-item"
          >
            <span className="todo-text">{todo.text}</span>

            <div className="timer">
              {formatTime(todo.time)}
            </div>

            <div className="button-group">
              <button
                className="timer-button start"
                onClick={() => handleToggleTimer(todo.id)}
               // disabled={todo.isRunning}
              >
                {todo.isRunning ? "Pause" : "Start"}
              </button>

              <button
                className="timer-button reset"
                onClick={() => handleReset(todo.id)}
              >
                Reset
              </button>

              <button
                className="delete-button"
                onClick={() => handleDelete(todo.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoWithTimeout;
