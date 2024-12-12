import { Todo } from "../shared/models";
import { addTodo, toggleTodo, deleteTodo } from "../utils/todoFunctions";

describe('todo functions', () => {
    test('add new task', () => {
      const setTodos = jest.fn();
      const todos: Todo[] = [];
      const task = 'New Task';
      
      addTodo(task, todos, setTodos);
      
      expect(setTodos).toHaveBeenCalledWith([{ id: expect.any(String), task, isCompleted: false }, ...todos]);
    });
    
    test('toggle to completed', () => {
      const setTodos = jest.fn();
      const todos = [{ id: '1', task: 'Task 1', isCompleted: false }];
      
      toggleTodo('1', todos, setTodos);
      
      expect(setTodos).toHaveBeenCalledWith([{ id: '1', task: 'Task 1', isCompleted: true }]);
    });
    
    test('delete task', () => {
      const setTodos = jest.fn();
      const todos = [{ id: '1', task: 'Task 1', isCompleted: false }];
      
      deleteTodo('1', todos, setTodos);
      
      expect(setTodos).toHaveBeenCalledWith([]);
    });
  });