import cuid from 'cuid';
import { KeyboardEvent } from 'react';
import create from 'zustand';

export interface ITodo {
  id: string;
  task: string;
  done: boolean;
}

interface TodoStore {
  todos: ITodo[];
  input: string;
  handleInputChange: (newInput: string) => void;
  addTodo: () => void;
  toggleTodo: (id: string) => void;
  addTodoWithEnterKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  deleteItem: (id: string) => void;
}

const setTodos = (todos: ITodo[]) => {
  localStorage.setItem('todos', JSON.stringify(todos || []));
};

const addTodo = (input: string) => {
  const newTodos: ITodo[] = [
    ...getTodos(),
    { task: input, done: false, id: cuid() },
  ];

  setTodos(newTodos);
  return newTodos;
};

const toggleTodo = (id: string): ITodo[] => {
  const todos = getTodos();

  const newTodos = todos.map((todo) => ({
    ...todo,
    done: todo.id === id ? !todo.done : todo.done,
  }));

  setTodos(newTodos);
  return newTodos;
};

const getTodos = () => {
  const todos = localStorage.getItem('todos');
  !todos && setTodos([]);

  console.log(JSON.parse(localStorage.getItem('todos') || ''));

  return JSON.parse(localStorage.getItem('todos') || '') as ITodo[];
};

const deleteItem = (id: string) => {
  const todos = getTodos();
  const index = todos.findIndex((todo) => todo.id === id);
  todos.splice(index, 1);

  setTodos(todos);
  return todos;
};

export const useTodoStore = create<TodoStore>((set) => ({
  todos: getTodos() || [],
  input: '',

  addTodo: () => {
    set((state) => ({
      ...state,
      input: '',
      todos: addTodo(state.input),
    }));
  },

  addTodoWithEnterKey: (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' &&
      set((state) => ({
        ...state,
        input: '',
        todos: addTodo(state.input),
      }));
  },

  toggleTodo: (id: string) => {
    set((state) => ({
      ...state,
      todos: toggleTodo(id),
    }));
  },

  handleInputChange: (newInput: string) => {
    set((state) => ({ ...state, input: newInput }));
  },

  deleteItem: (id: string) => {
    set((state) => ({
      ...state,
      todos: deleteItem(id),
    }));
  },
}));
