import { nanoid } from "@reduxjs/toolkit";
import { Todo } from "../shared/models";

export const addTodo = (task: string, todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    if (task.trim()) {
      setTodos([{ id: nanoid(), task, isCompleted: false }, ...todos]);
    }
  };
  
  export const toggleTodo = (id: string, todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };
  
  export const deleteTodo = (id: string, todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  