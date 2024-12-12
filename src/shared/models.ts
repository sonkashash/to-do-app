export type Todo = {
    id: string;
    task: string;
    isCompleted: boolean;
};

export type TodoInputProps = {
    addTodo: (task: string) => void;
  };
  
export type TodoListProps = {
    todos: Todo[];
    toggleTodo: (id: string) => void;
    deleteTodo: (id: string) => void;
  };