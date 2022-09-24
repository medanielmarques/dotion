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

const addTodo = (todos: Todo[], input: string): Todo[] => [
  ...todos,
  { task: input, done: false },
];

const toggleTodo = (todos: Todo[], index: number): Todo[] =>
  todos.map((todo, i) => ({
    ...todo,
    done: index === i ? !todo.done : todo.done,
  }));

export const useTodoStore = create<TodoStore>((set) => ({
  todos: [],
  input: '',

  addTodo: () => {
    set((state) => ({
      ...state,
      input: '',
      todos: addTodo(state.todos, state.input),
    }));
  },

  addTodoWithEnterKey: (e: KeyboardEvent<HTMLInputElement>) => {
    e.key === 'Enter' &&
      set((state) => ({
        ...state,
        input: '',
        todos: addTodo(state.todos, state.input),
      }));
  },

  toggleTodo: (index: number) => {
    set((state) => ({
      ...state,
      todos: toggleTodo(state.todos, index),
    }));
  },

  handleInputChange: (newInput: string) => {
    set((state) => ({ ...state, input: newInput }));
  },
}));
