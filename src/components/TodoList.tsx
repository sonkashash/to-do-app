import React from 'react';
import { List} from 'antd';
import TodoItem from './TodoItem';
import { TodoListProps } from '../shared/models';

const TodoList: React.FC<TodoListProps> = ({ todos, toggleTodo, deleteTodo }) => {
  return (
    <List
      style={{
        backgroundColor: "white",
        maxHeight: "300px",
        overflowY: "scroll",
        position: "relative"
      }}
      bordered
      dataSource={todos}
      renderItem={(todo) => (
        <TodoItem todo={todo} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
      )}
    />
  );
};

export default TodoList;
