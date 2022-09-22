import { KeyboardEvent, useState } from 'react';

interface Todo {
  task: string;
  done: boolean;
}

function App() {
  const [todos, todosSet] = useState([] as Todo[]);
  const [input, inputSet] = useState('');

  const addTodo = () =>
    todosSet((todos) => [...todos, { task: input, done: false }]);

  const toggleTodo = (i: number) =>
    todosSet((todos) =>
      todos.map((todo, index) => ({
        ...todo,
        done: i === index ? !todo.done : todo.done,
      }))
    );

  const addTodoWithEnterKey = (e: KeyboardEvent<HTMLInputElement>) =>
    e.key === 'Enter' && addTodo();

  return (
    <div className='mx-auto container p-12 flex flex-col gap-3'>
      <div className='flex gap-2'>
        <input
          type='text'
          value={input}
          onChange={(e) => inputSet(e.currentTarget.value)}
          className='rounded-md w-72 text-gray-800 p-2'
          onKeyDown={addTodoWithEnterKey}
          placeholder='My super fun task :D'
        />

        <button
          className='p-2 bg-gray-500 rounded-md hover:bg-gray-400'
          onClick={addTodo}
        >
          add task
        </button>
      </div>

      <div>
        {todos.map((todo, i) => (
          <div key={i} className='flex gap-4'>
            <input
              type='checkbox'
              className='cursor-pointer bg-black-900'
              checked={todo.done}
              onChange={() => toggleTodo(i)}
            />
            <span
              className='cursor-default text-lg'
              style={{ textDecoration: todo.done ? 'line-through' : '' }}
              onClick={() => toggleTodo(i)}
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
