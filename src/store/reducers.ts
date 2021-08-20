import { combineReducers } from 'redux';
import StorageServise from './StorageServise';
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters,
} from './actions';

const appStorage = new StorageServise();

function cards(state = appStorage.getCards(), action: any) {
  switch (action.type) {
    case ADD_TODO:
      return state;
    default:
      return state;
  }
}
function columns(state = appStorage.getColumns(), action: any) {
  switch (action.type) {
    case ADD_TODO:
      return state;
    default:
      return state;
  }
}
function comments(state = appStorage.getComments(), action: any) {
  switch (action.type) {
    case ADD_TODO:
      return state;
    default:
      return state;
  }
}
function user(state = appStorage.getUser(), action: any) {
  switch (action.type) {
    case ADD_TODO:
      return state;
    default:
      return state;
  }
}

const App = combineReducers({
  cards,
  columns,
  comments,
  user,
});

export default App;

// import {
//   addTodo,
//   toggleTodo,
//   setVisibilityFilter,
//   VisibilityFilters,
// } from './store/actions';
// import { addTodo } from './store/actions';
// import PropTypes from 'prop-types';

// // store.dispatch(addTodo(1));
// console.log(store.getState());

// Каждый раз при обновлении состояния - выводим его
// Отметим, что subscribe() возвращает функцию для отмены регистрации слушателя
// store.subscribe(() => console.log(store.getState()));

// Отправим несколько экшенов
// store.dispatch(addTodo('Learn about actions'));
// store.dispatch(addTodo('Learn about reducers'));
// store.dispatch(addTodo('Learn about store'));
// store.dispatch(toggleTodo(0));
// store.dispatch(toggleTodo(1));
// store.dispatch(setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));
// console.log(store.getState());

// Прекратим слушать обновление состояния
// unsubscribe();

// const { SHOW_ALL } = VisibilityFilters;

// function visibilityFilter(
//   state = SHOW_ALL,
//   action: { type: string; filter: string },
// ) {
//   switch (action.type) {
//     case SET_VISIBILITY_FILTER:
//       return action.filter;
//     default:
//       return state;
//   }
// }
