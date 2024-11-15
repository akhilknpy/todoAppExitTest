// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/todos').then((response) => {
      setTodos(response.data);
    });
  }, []);

  const addTodo = () => {
    axios.post('http://localhost:3000/addtodos', { description: newTodo, status: 'ongoing' }).then((response) => {
      setTodos([...todos, response.data]);
      setNewTodo('');
    });
  };

  const deleteTodo = (id) => {
    axios.delete(`http://localhost:3000/todos/${id}`).then(() => {
      setTodos(todos.filter((todo) => todo._id !== id));
    });
  };

  const toggleStatus = (id) => {
    const todo = todos.find((todo) => todo._id === id);
    axios.put(`http://localhost:3000/todos/${id}`, { ...todo, status: todo.status === 'ongoing' ? 'completed' : 'ongoing' }).then((response) => {
      setTodos(todos.map((todo) => (todo._id === id ? response.data : todo)));
    });
  };

  return (
    <div>
      <h1>Todo List</h1>
      <input value={newTodo} onChange={(e) => setNewTodo(e.target.value)} />
      <button onClick={addTodo}>Add</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span style={{ textDecoration: todo.status === 'completed' ? 'line-through' : 'none' }}>{todo.description}</span>
            <input type="checkbox" checked={todo.status === 'completed'} onChange={() => toggleStatus(todo._id)} />
            <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;