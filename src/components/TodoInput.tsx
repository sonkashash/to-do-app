import React, { useState } from 'react';
import { Input } from 'antd';
import { TodoInputProps } from '../shared/models';

const TodoInput: React.FC<TodoInputProps> = ({ addTodo }) => {
  const [task, setTask] = useState('');

  const handleAddTodo = () => {
    addTodo(task);
    setTask('');
  };

  return (
    <Input
      style={{ height: "50px", borderRadius: "0px" }}
      placeholder="What needs to be done?"
      value={task}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTask(e.target.value)}
      onPressEnter={handleAddTodo}
    />
  );
};

export default TodoInput;
