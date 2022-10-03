import {
  Trash as DeleteIcon,
  DotsSixVertical as HamburgerMenuIcon,
} from 'phosphor-react';
import { useEffect } from 'react';

import { useContextMenuStore } from './context-menu-store';
import { ITodo, useTodoStore } from './todo-store';

export const App = () => {
  const { todos, input, handleInputChange, addTodo, addTodoWithEnterKey } =
    useTodoStore();

  const { showContextMenu, closeContextMenu } = useContextMenuStore();

  useEffect(() => {
    document.addEventListener('click', closeContextMenu);
  });

  return (
    <>
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
            <Todo key={todo.id} todo={todo} />
          ))}
        </div>
      </div>

      {showContextMenu && <ContextMenu />}
    </>
  );
};

const Todo = ({ todo }: { todo: ITodo }) => {
  const { toggleTodo } = useTodoStore();

  const { handleContextMenu } = useContextMenuStore();

  return (
    <div className='flex gap-2 items-center'>
      <HamburgerMenuIcon
        onContextMenu={handleContextMenu}
        size={20}
        className='cursor-pointer text-zinc-500'
      />

      <input
        type='checkbox'
        className='w-5 h-5 cursor-pointer bg-black-900'
        checked={todo.done}
        onContextMenu={handleContextMenu}
        onChange={() => toggleTodo(todo.id)}
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
  );
};

const ContextMenu = () => {
  const { anchorPoint } = useContextMenuStore();

  return (
    <div
      className='bg-gray-700 w-72 h-96 absolute rounded-md p-3'
      style={{ top: anchorPoint.y, left: anchorPoint.x }}
    >
      <div
        className='flex items-center justify-between cursor-pointer
      hover:bg-gray-600 rounded-md py-2 px-3'
      >
        <div className='flex items-center gap-2'>
          <DeleteIcon size={20} />
          <button className='text-lg'>Delete</button>
        </div>

        <span className='text-gray-400'>Del</span>
      </div>
    </div>
  );
};
