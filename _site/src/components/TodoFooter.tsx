import React from 'react';

type FooterProps = {
  todos: { id: string; task: string; isCompleted: boolean }[];
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  clearCompleted: () => void;
};

const TodoFooter: React.FC<FooterProps> = ({ todos, filter, setFilter, clearCompleted }) => {

  const showItemsLeft = (filter: string) => {
    const filteredTodos = todos.filter(todo => !todo.isCompleted);
    const filteredCompleted = todos.filter(todo => todo.isCompleted);
    const isPlural = (num: number) => (num === 1 ? '' : 's');

    switch (filter) {
      case 'all':
      case 'active':
        return <span>{filteredTodos.length} item{isPlural(filteredTodos.length)} left</span>;
      case 'completed':
        return <span>{filteredCompleted.length} item{isPlural(filteredTodos.length)} completed</span>;
      default:
        return null;
    }
  };

  return (
    <div className='footer'>
      <span className='items-left'>{showItemsLeft(filter)}</span>
      <div className="status">
        <button onClick={() => setFilter('all')} className={filter === 'all' ? 'checked' : ''}>All</button>
        <button onClick={() => setFilter('active')} className={filter === 'active' ? 'checked' : ''}>Active</button>
        <button onClick={() => setFilter('completed')} className={filter === 'completed' ? 'checked' : ''}>Completed</button>
      </div>
      <button onClick={clearCompleted}>
        Clear completed
      </button>
    </div>
  );
};

export default TodoFooter;
