import React from 'react';
import { List, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { Todo } from '../shared/models';

type TodoItemProps = {
  todo: Todo;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, toggleTodo, deleteTodo }) => {
  return (
    <List.Item
      actions={[
        <Button type="link" onClick={() => deleteTodo(todo.id)} danger>
          <DeleteOutlined />
        </Button>,
      ]}
    >
      <label className="custom-checkbox">
        <input
          type="checkbox"
          checked={todo.isCompleted}
          onChange={() => toggleTodo(todo.id)}
        />
        <span className="checkmark"></span>
        <span className={todo.isCompleted ? 'completed-task' : 'task'}>
          {todo.task}
        </span>
      </label>
    </List.Item>
  );
};

export default TodoItem;
