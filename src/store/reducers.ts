// import { combineReducers } from 'redux';
import StorageServise from './StorageServise';
import { cards, comments, user, columns } from '../types';
import {
  SET_USER,
  SET_CARD_CHECKED,
  DELETE_CARD,
  CHANGE_CARD_HEADER,
} from './actions';

const appStorage = new StorageServise();

// Вспомогательные функции, меняющие значения state

function getUser(user: user, userName: user): string {
  if (userName !== user) {
    appStorage.setUser(userName);
    return userName;
  }
  return user;
}

function onCradChecked(cards: cards[], id: string): cards[] {
  const newCards = cards.map((item) => {
    if (item.id === id) {
      return { ...item, checked: !item.checked };
    }
    return item;
  });
  appStorage.setCards(newCards);
  return newCards;
}

function onCardDelete(
  cards: cards[],
  comments: comments[],
  id: string,
): { cards: cards[]; comments: comments[]; showCardId: string } {
  let newCards: cards[] = cards.filter((elem) => {
    return elem.id !== id;
  });

  appStorage.setCards(newCards);
  // setShowCardId('');

  const commentsId: string[] = [];
  for (const item of comments) {
    if (item.card === id) {
      commentsId.push(item.id);
    }
  }

  return {
    cards: newCards,
    comments: onDeleteComments(comments, commentsId),
    showCardId: '',
  };
}

const onDeleteComments = (comments: comments[], ids: string[]): comments[] => {
  const filteredComments = comments.filter((comment) => {
    return !ids.includes(comment.id);
  });
  appStorage.setComments(filteredComments);
  return filteredComments;
};

// Reducers

// function UserInterfaceState(
//   state = { createCardId: '', showCardId: '', listenerESC: false },
//   action: { type: string; value: any },
// ) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

function appState(
  state = {
    cards: appStorage.getCards(),
    columns: appStorage.getColumns(),
    comments: appStorage.getComments(),
    user: appStorage.getUser(),
    createCardId: '',
    showCardId: '',
    listenerESC: false,
  },
  action: { type: string; value: any },
) {
  switch (action.type) {
    case SET_USER:
      return (state = { ...state, user: getUser(state.user, action.value) });
    case SET_CARD_CHECKED:
      return (state = {
        ...state,
        cards: onCradChecked(state.cards, action.value),
      });
    case DELETE_CARD:
      const newState = onCardDelete(state.cards, state.comments, action.value);
      return (state = {
        ...state,
        cards: newState.cards,
        comments: newState.comments,
        showCardId: newState.showCardId,
      });
    default:
      return state;
  }
}

// function column(
//   state: columns[] = appStorage.getColumns(),
//   action: { type: string; value: any },
// ) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

// function comment(
//   state: comments[] = appStorage.getComments(),
//   action: { type: string; value: any },
// ) {
//   switch (action.type) {
//     default:
//       return state;
//   }
// }

// function userState(
//   state: user = appStorage.getUser(),
//   action: { type: string; value: any },
// ) {
//   switch (action.type) {

//     default:
//       return state;
//   }
// }

// const App = combineReducers({
//   appState
// });

export default appState;

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
