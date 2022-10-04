import {
  Copy as CopyIcon,
  Trash as DeleteIcon,
  DotsSixVertical as HamburgerMenuIcon,
} from 'phosphor-react';
import { ReactNode, useEffect } from 'react';

import { useContextMenuStore } from './context-menu-store';
import { ITodo, useTodoStore } from './todo-store';

export const App = () => {
  const { todos, input, handleInputChange, addTodo, addTodoWithEnterKey } =
    useTodoStore();

  const { closeContextMenu, selectedItemId } = useContextMenuStore();

  useEffect(() => {
    console.log(selectedItemId);
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

      <ContextMenu />
    </>
  );
};

const Todo = ({ todo }: { todo: ITodo }) => {
  const { toggleTodo } = useTodoStore();
  const { handleContextMenu } = useContextMenuStore();

  return (
    <div className='flex gap-2 items-center'>
      <HamburgerMenuIcon
        onContextMenu={(e) => handleContextMenu(e, todo.id)}
        size={20}
        className='cursor-pointer text-zinc-500 hover:bg-gray-700 rounded-sm'
      />

      <input
        type='checkbox'
        className='w-5 h-5 cursor-pointer bg-black-900'
        checked={todo.done}
        onContextMenu={(e) => handleContextMenu(e, todo.id)}
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
  const { anchorPoint, selectedItemId, showContextMenu } =
    useContextMenuStore();
  const { deleteItem, duplicateItem } = useTodoStore();

  if (!showContextMenu) return null;

  return (
    <div
      className='bg-gray-700 w-80 h-96 absolute rounded-md p-3'
      style={{ top: anchorPoint.y, left: anchorPoint.x }}
    >
      <ContextMenuItem
        label='Delete'
        handleClick={() => deleteItem(selectedItemId)}
        shortcut='Del'
      >
        <DeleteIcon size={20} />
      </ContextMenuItem>

      <ContextMenuItem
        label='Duplicate'
        handleClick={() => duplicateItem(selectedItemId)}
        shortcut='Ctrl+D'
      >
        <CopyIcon size={20} />
      </ContextMenuItem>
    </div>
  );
};

const ContextMenuItem = ({
  label,
  handleClick,
  shortcut,
  children,
}: {
  label: string;
  handleClick: () => void;
  shortcut: string;
  children: ReactNode;
}) => (
  <div
    className='flex items-center justify-between cursor-pointer
      hover:bg-gray-600 rounded-md py-1 px-3'
    onClick={handleClick}
  >
    <div className='flex items-center gap-2'>
      {children}
      <button className='text-lg'>{label}</button>
    </div>

    <span className='text-gray-400'>{shortcut}</span>
  </div>
);
