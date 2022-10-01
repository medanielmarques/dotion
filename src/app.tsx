import { useTodoStore } from './todo-store';

function App() {
  const {
    todos,
    input,
    handleInputChange,
    addTodo,
    toggleTodo,
    addTodoWithEnterKey,
  } = useTodoStore();

  return (
    <div className='mx-auto container p-12 flex flex-col gap-3'>
      <div className='flex gap-2'>
        <input
          type='text'
          value={input}
          onChange={(e) => handleInputChange(e.currentTarget.value)}
          className='rounded-md w-72 text-gray-800 p-2'
          onKeyDown={addTodoWithEnterKey}
          placeholder='My super fun task :D'
        />

        <button
          className='p-2 bg-gray-500 rounded-md hover:bg-gray-400'
          onClick={() => input !== '' && addTodo()}
        >
          add task
        </button>
      </div>

      <div>
        {todos.map((todo, i) => (
          <div key={i} className='flex gap-2 items-center'>
            <input
              type='checkbox'
              className='w-5 h-5 cursor-pointer bg-black-900'
              checked={todo.done}
              onChange={() => toggleTodo(i)}
            />
            <span
              className='cursor-default text-lg'
              style={{
                textDecoration: todo.done ? 'line-through' : '',
                color: todo.done ? 'gray' : 'inherit',
              }}
            >
              {todo.task}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
