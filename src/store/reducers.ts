import { combineReducers } from 'redux';
import StorageServise from './StorageServise';
import { cards, comments, user, columns } from '../types';
import { SET_USER } from './actions';

const appStorage = new StorageServise();

// Вспомогательные функции, меняющие значения state

function getUser(user: user, userName: user): string {
  if (userName !== user) {
    appStorage.setUser(userName);
    return userName;
  }
  return user;
}

// function onCradChecked(id: string): void {
//   const newArr = cards.map((item) => {
//     if (item.id === id) {
//       return { ...item, checked: !item.checked };
//     }
//     return item;
//   });
//   appStorage.setCards(newArr);
//   setCards(newArr);
// }

// function onCardDelete(id: string): void {
//   let newArr: cards[] = cards.filter((elem) => {
//     return elem.id !== id;
//   });

//   appStorage.setCards(newArr);
//   setCards(newArr);
//   setShowCardId('');

//   const commentsId: string[] = [];
//   for (const item of comments) {
//     if (item.card === id) {
//       commentsId.push(item.id);
//     }
//   }

//   onDeleteComments(commentsId);
// }

// Reducers

function UserInterfaceState(
  state = { createCardId: '', showCardId: '', listenerESC: false },
  action: { type: string; value: any },
) {
  switch (action.type) {
    default:
      return state;
  }
}

function card(
  state: cards[] = appStorage.getCards(),
  action: { type: string; value: any },
) {
  switch (action.type) {
    default:
      return state;
  }
}

function column(
  state: columns[] = appStorage.getColumns(),
  action: { type: string; value: any },
) {
  switch (action.type) {
    default:
      return state;
  }
}

function comment(
  state: comments[] = appStorage.getComments(),
  action: { type: string; value: any },
) {
  switch (action.type) {
    default:
      return state;
  }
}

function userState(
  state: user = appStorage.getUser(),
  action: { type: string; value: any },
) {
  switch (action.type) {
    case SET_USER:
      return (state = getUser(state, action.value));
    default:
      return state;
  }
}

const App = combineReducers({
  card,
  column,
  comment,
  userState,
  UserInterfaceState,
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
