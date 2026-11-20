import React from "react";
import TodoWithTimeout from "./TodoWithTimeout";
import "./styles.css";

export default function App() {
  return (
    <div className="App">
      <h2>Todo List with Timer</h2>
      <p>
        Build a todo list where each task has its own timer that can be started,
        paused, and reset.
      </p>
      <div className="container">
        <TodoWithTimeout />
        {/* <Template /> */}
      </div>
    </div>
  );
}
