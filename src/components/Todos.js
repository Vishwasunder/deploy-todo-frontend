import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';

function Todos({ user }) {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [status, setStatus] = useState('pending');

  // const token = localStorage.getItem('token');
  // const config = { headers: { Authorization: `Bearer ${token}` } };
  const config = useMemo(() => ({
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  }), []);
  useEffect(() => {
    axios.get('https://deploy-todo-backend.onrender.com/api/todos', config)
      .then(res => setTodos(res.data))
      .catch(err => console.error(err.response?.data?.message || 'Error fetching tasks'));
  }, [config]);

  const addTodo = async () => {
    try {
      const res = await axios.post('https://deploy-todo-backend.onrender.com/api/todos', { title: newTask, status }, config);
      console.log(res)
      setTodos([...todos, res.data]);
      setNewTask('');
      setStatus('pending');
    } catch (err) {
      console.error(err.response?.data?.message || 'Error adding task');
    }
  };

  const updateTodo = async (id, title, status) => {
    try {
      await axios.put(`https://deploy-todo-backend.onrender.com/api/todos/${id}`, { title, status }, config);
      setTodos(todos.map(todo => todo.id === id ? { ...todo, title, status } : todo));
    } catch (err) {
      console.error(err.response?.data?.message || 'Error updating task');
    }
  };

  const deleteTodo = async (id) => {
    try {
      await axios.delete(`https://deploy-todo-backend.onrender.com/api/todos/${id}`, config);
      setTodos(todos.filter(todo => todo.id !== id));
    } catch (err) {
      console.error(err.response?.data?.message || 'Error deleting task');
    }
  };

  return (
    <div>
      <h3>Welcome, {user.email}</h3>
      <input 
        type="text" 
        className="form-control mb-2" 
        placeholder="New Task" 
        value={newTask} 
        onChange={(e) => setNewTask(e.target.value)} 
      />
      <select className="form-control mb-2" value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pending</option>
        <option value="in progress">In Progress</option>
        <option value="done">Done</option>
      </select>
      <button onClick={addTodo} className="btn btn-success mb-3">Add Task</button>
      
      <ul className="list-group">
        {todos.map(todo => (
          <li key={todo.id} className="list-group-item">
            <input 
              type="text" 
              className="form-control mb-2" 
              value={todo.title} 
              onChange={(e) => updateTodo(todo.id, e.target.value, todo.status)} 
            />
            <select 
              className="form-control mb-2" 
              value={todo.status} 
              onChange={(e) => updateTodo(todo.id, todo.title, e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <button onClick={() => deleteTodo(todo.id)} className="btn btn-danger btn-sm">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Todos;
