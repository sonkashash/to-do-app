import React, { useState, useEffect } from 'react';
import { Space } from 'antd';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import { Todo } from './shared/models';
import { addTodo, toggleTodo, deleteTodo } from './utils/todoFunctions';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    if (todos.length) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  const clearCompleted = () => {
    setTodos(todos.filter(todo => !todo.isCompleted));
  };

  const filteredTodos = todos.filter(todo => {
    switch (filter) {
      case 'completed':
        return todo.isCompleted;
      case 'active':
        return !todo.isCompleted;
      default:
        return true;
    }
  });

  return (
    <div className="todo-app">
      <h1 className="title">todos</h1>
      <Space direction="vertical" style={{ width: '100%' }}>
        <TodoInput addTodo={(task: string) => addTodo(task, todos, setTodos)} />
        <TodoList todos={filteredTodos} toggleTodo={(id: string) => toggleTodo(id, todos, setTodos)} deleteTodo={(id: string) => deleteTodo(id, todos, setTodos)} />
        <TodoFooter todos={todos} filter={filter} setFilter={setFilter} clearCompleted={clearCompleted} />
      </Space>
    </div>
  );
};

export default App;

