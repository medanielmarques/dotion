import { KeyboardEvent } from 'react';
import create from 'zustand';

interface Todo {
  task: string;
  done: boolean;
}

interface TodoStore {
  todos: Todo[];
  input: string;
  handleInputChange: (newInput: string) => void;
  addTodo: () => void;
  toggleTodo: (index: number) => void;
  addTodoWithEnterKey: (e: KeyboardEvent<HTMLInputElement>) => void;
}

const addTodo = (input: string) => {
  const newTodos: Todo[] = [...getTodos(), { task: input, done: false }];
  localStorage.setItem('todos', JSON.stringify(newTodos));
  return newTodos;
};

const toggleTodo = (index: number): Todo[] => {
  const todos = getTodos();

  const newTodos = todos.map((todo, i) => ({
    ...todo,
    done: index === i ? !todo.done : todo.done,
  }));

  localStorage.setItem('todos', JSON.stringify(newTodos));
  return newTodos;
};

const getTodos = () => {
  const todos = localStorage.getItem('todos');

  if (!todos) {
    localStorage.setItem('todos', JSON.stringify([]));
  }

  console.log(JSON.parse(localStorage.getItem('todos') || ''));

  return JSON.parse(localStorage.getItem('todos') || '') as Todo[];
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

  toggleTodo: (index: number) => {
    set((state) => ({
      ...state,
      todos: toggleTodo(index),
    }));
  },

  handleInputChange: (newInput: string) => {
    set((state) => ({ ...state, input: newInput }));
  },
}));
