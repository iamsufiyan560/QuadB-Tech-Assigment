import {
  ADD_TODO,
  TOGGLE_TODO,
  REMOVE_TODO,
  MARK_COMPLETED,
  MARK_INCOMPLETE,
  FILTER_TODOS,
  MARK_ALL_COMPLETED,
  UPDATE_SEARCH_TERM,
  EDIT_TODO,
} from "./actionTypes";

const initialState = {
  todos: JSON.parse(localStorage.getItem("todos")) || [],
  filter: "ALL",
  searchTerm: "",
};

const saveToLocalStorage = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todoReducer = (state = initialState, action) => {
  let newTodos;

  switch (action.type) {
    case ADD_TODO:
      newTodos = [
        ...state.todos,
        { text: action.payload.text, completed: false },
      ];
      saveToLocalStorage(newTodos);
      return {
        todos: newTodos,
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case TOGGLE_TODO:
      newTodos = state.todos.map((todo, index) =>
        index === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
      saveToLocalStorage(newTodos);
      return {
        todos: newTodos,
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case REMOVE_TODO:
      newTodos = state.todos.filter(
        (todo, index) => index !== action.payload.id
      );
      saveToLocalStorage(newTodos);
      return {
        todos: newTodos,
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case MARK_COMPLETED:
      newTodos = state.todos.map((todo, index) =>
        index === action.payload.id ? { ...todo, completed: true } : todo
      );
      saveToLocalStorage(newTodos);
      return {
        todos: newTodos,
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case MARK_INCOMPLETE:
      newTodos = state.todos.map((todo, index) =>
        index === action.payload.id ? { ...todo, completed: false } : todo
      );
      saveToLocalStorage(newTodos);
      return {
        todos: newTodos,
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case FILTER_TODOS:
      return {
        todos: state.todos,
        filter: action.payload.filter,
        searchTerm: state.searchTerm,
      };

    case UPDATE_SEARCH_TERM:
      return {
        todos: state.todos,
        filter: state.filter,
        searchTerm: action.payload.searchTerm,
      };

    case MARK_ALL_COMPLETED:
      newTodos = state.todos.map((todo) => ({ ...todo, completed: true }));
      saveToLocalStorage(newTodos);
      return {
        todos: newTodos,
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    case EDIT_TODO:
      newTodos = state.todos.map((todo, index) =>
        index === action.payload.id
          ? { ...todo, text: action.payload.text }
          : todo
      );
      saveToLocalStorage(newTodos);
      return {
        todos: newTodos,
        filter: state.filter,
        searchTerm: state.searchTerm,
      };

    default:
      return state;
  }
};

export default todoReducer;
