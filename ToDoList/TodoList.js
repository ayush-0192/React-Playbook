import  { React,useState } from 'react';


function TodoList() {
  const [input, setInput] = useState('');
  const [todos, setTodos] = useState([]);

  const addTodo = () => {
    const text = input.trim()
    if (!text) return;
    const newTodo = {
      id: crypto.randomUUID(),
      text: text,
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setInput('')
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      addTodo()
    }
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) => todo.id === id ?
        { ...todo, completed: !todo.completed } : todo)
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
      <div className = "container">
        <div className = "input-container">
        <input
          type="text"
          placeholder="Enter todo"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick = {addTodo}>Add</button>
      </div>

      <ul>
        {
          todos.map((todo) => (
            <li key={todo.id}>
              <div className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span
                  className={todo.completed ? "completed" : ""}
                >
                  {todo.text}
                </span>
                <button onClick={() => deleteTodo(todo.id)} > Delete
                </button>
              </div>
            </li>
          ))
        }
      </ul>
      
      </div>
    );
}

export default TodoList;