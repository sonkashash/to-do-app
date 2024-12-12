// import React, { useState, useEffect } from 'react';
// import { List, Button, Input, Space } from 'antd';
// import { nanoid } from 'nanoid';
// import './App.css';
// import { DeleteOutlined } from '@ant-design/icons';

// type Todo = {
//   id: string;
//   task: string;
//   isCompleted: boolean;
// };

// const TodoApp: React.FC = () => {
//   const [todos, setTodos] = useState<Todo[]>(() => {
//     const savedTodos = localStorage.getItem('todos');
//     return savedTodos ? JSON.parse(savedTodos) : [];
//   });
//   const [task, setTask] = useState('');
//   const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

//   useEffect(() => {
//     if (todos.length) {
//       localStorage.setItem('todos', JSON.stringify(todos));
//     }
//   }, [todos]);

//   const addTodo = () => {
//     if (task.trim()) {
//       setTodos([{ id: nanoid(), task, isCompleted: false }, ...todos]);
//       setTask('');
//     }
//   };

//   const toggleTodo = (id: string) => {
//     setTodos(todos.map(todo => (todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo)));
//   };

//   const deleteTodo = (id: string) => {
//     setTodos(todos.filter(todo => todo.id !== id));
//   };

//   const clearCompleted = () => {
//     setTodos(todos.filter(todo => !todo.isCompleted));
//   };

//   const filteredTodos = todos.filter(todo => {
//     if (filter === 'all') return true;
//     return filter === 'completed' ? todo.isCompleted : !todo.isCompleted;
//   });

  // const showItemsLeft = (filter: string) => {
  //   const filteredTodos = todos.filter(todo => !todo.isCompleted);
  //   const filteredCompleted = todos.filter(todo => todo.isCompleted);
  //   const isPlural = (num: number) => (num === 1 ? '' : 's');

  //   switch (filter) {
  //     case 'all':
  //     case 'active':
  //       return <span>{filteredTodos.length} item{isPlural(filteredTodos.length)} left</span>;
  //     case 'completed':
  //       return <span>{filteredCompleted.length} item{isPlural(filteredTodos.length)} completed</span>;
  //     default:
  //       return null;
  //   }
  // };

//   return (
//     <div className="todo-app">
//       <h1 className="title">todos</h1>
//       <Space direction="vertical" style={{ width: '100%' }}>
//         <Input
//           style={{ height: "50px", borderRadius: "0px" }}
//           placeholder="What needs to be done?"
//           value={task}
//           onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
//           onPressEnter={addTodo}
//         />
//         <List
//           style={{
//             backgroundColor: "white",
//             maxHeight: "400px",
//             overflowY: "scroll",
//             position: "relative"
//           }}
//           bordered
//           dataSource={filteredTodos}
//           renderItem={(todo) => (
//             <List.Item
//               actions={[
//                 <Button type="link" onClick={() => deleteTodo(todo.id)} danger>
//                   <DeleteOutlined />
//                 </Button>,
//               ]}
//             >
//               <label className="custom-checkbox">
//                 <input
//                   type="checkbox"
//                   checked={todo.isCompleted}
//                   onChange={() => toggleTodo(todo.id)}
//                 />
//                 <span className="checkmark"></span>

//                 <span className={todo.isCompleted ? 'completed-task' : 'task'}>
//                   {todo.task}
//                 </span>
//               </label>
//             </List.Item>
//           )}
//         >
//           <div className={todos.length === 0 ? 'footer' : 'footer no-todos'}>
//             <span className='items-left'>{showItemsLeft(filter)}</span>
//             <div className="status">
//               <button onClick={() => setFilter('all')} className={filter === 'all' ? 'checked' : ''}>All</button>
//               <button onClick={() => setFilter('active')} className={filter === 'active' ? 'checked' : ''}>Active</button>
//               <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'checked' : ''}>Completed</button>
//             </div>
//             <button onClick={clearCompleted}>
//               Clear completed
//             </button>
//           </div>
//         </List>
//       </Space>
//     </div>
//   );
// };

// export default TodoApp;
import React, { useState, useEffect } from 'react';
import { Space } from 'antd';
import './App.css';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import TodoFooter from './components/TodoFooter';
import { Todo } from './shared/models';
import { addTodo, toggleTodo, deleteTodo } from './utils/todoFunctions';

const TodoApp: React.FC = () => {
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

export default TodoApp;

