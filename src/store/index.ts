import {
  configureStore,
  createSlice,
  PayloadAction,
  getDefaultMiddleware,
} from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { cards, columns, comments, user } from '../types';

const cardsInitialState: cards[] = [
  {
    id: 'w1',
    title: 'Отчет',
    text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
    checked: false,
    author: 'Дмитрий',
    columnId: 'ToDo',
  },
];
const columnsInitialState: columns[] = [
  { id: 'ToDo', title: 'To Do' },
  { id: 'InProgress', title: 'In progress' },
  { id: 'Testing', title: 'Testing' },
  { id: 'Done', title: 'Done' },
];
const commentsInitialState: comments[] = [
  {
    id: 'c1',
    author: 'Димасик',
    text: 'деланные на базе интернет-аналитики выводы ассоциативно распределены',
    card: 'w1',
  },
  {
    id: 'c2',
    author: 'Димасик',
    text: 'деланные на базе интернет-аналитики выводы ассоциативно распределены',
    card: 'w1',
  },
];
const userInitialState: user = '';

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<{ userName: user }>) => {
      if (payload.userName !== state) {
        return payload.userName;
      }
    },
  },
});

const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsInitialState,
  reducers: {
    changeTitle: (
      state,
      { payload }: PayloadAction<{ columnId: string; newTitle: string }>,
    ) => {
      if (payload.newTitle.trim()) {
        const newArr = state.map((column) => {
          if (column.id === payload.columnId) {
            return { ...column, title: payload.newTitle };
          }
          return column;
        });
        return newArr;
      }
    },
  },
});

const cardsSlice = createSlice({
  name: 'cards',
  initialState: cardsInitialState,
  reducers: {
    create: (
      state,
      {
        payload,
      }: PayloadAction<{
        title: string;
        text: string;
        column: string;
        author: string;
      }>,
    ) => {
      if (payload.title.trim() && payload.text.trim()) {
        let id = 0;
        let success = false;
        const cardsId: string[] = [];

        for (let i = 0; i < state.length; i++) {
          cardsId.push(state[i].id);
        }

        while (!success) {
          if (cardsId.indexOf(`w${id}`) !== -1) {
            id++;
          } else {
            success = true;
          }
        }

        const card = {
          id: `w${id}`,
          title: payload.title,
          text: payload.text,
          checked: false,
          author: payload.author,
          columnId: payload.column,
        };

        const newCards = [...state, card];
        return newCards;
      }
    },
    onCardChecked: (state, { payload }: PayloadAction<{ cardId: string }>) => {
      const newArr = state.map((item) => {
        if (item.id === payload.cardId) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      return newArr;
    },
    onCardDelete: (state, { payload }: PayloadAction<{ cardId: string }>) => {
      let newArr: cards[] = state.filter((elem) => {
        return elem.id !== payload.cardId;
      });
      return newArr;
    },
    changeTitle: (
      state,
      { payload }: PayloadAction<{ cardId: string; title: string }>,
    ) => {
      if (payload.title.trim()) {
        const newArr = state.map((card) => {
          if (card.id === payload.cardId) {
            return { ...card, title: payload.title };
          }
          return card;
        });
        return newArr;
      }
    },
    changeText: (
      state,
      { payload }: PayloadAction<{ cardId: string; text: string }>,
    ) => {
      if (payload.text.trim()) {
        const newArr = state.map((card) => {
          if (card.id === payload.cardId) {
            return { ...card, text: payload.text };
          }
          return card;
        });
        return newArr;
      }
    },
  },
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsInitialState,
  reducers: {
    create: (
      state,
      {
        payload,
      }: PayloadAction<{ cardId: string; author: string; text: string }>,
    ) => {
      if (payload.text.trim()) {
        let commentId = 0;
        let success = false;
        const commentsId: string[] = [];

        for (let comment of state) {
          commentsId.push(comment.id);
        }

        while (!success) {
          if (commentsId.indexOf(`c${commentId}`) !== -1) {
            commentId++;
          } else {
            success = true;
          }
        }

        const comment = {
          id: `c${commentId}`,
          card: payload.cardId,
          author: payload.author,
          text: payload.text,
        };

        const newArr = [...state, comment];
        return newArr;
      }
    },
    onDelete: (state, { payload }: PayloadAction<{ ids: string[] }>) => {
      const filteredComments = state.filter((comment) => {
        return !payload.ids.includes(comment.id);
      });
      return filteredComments;
    },
    changeText: (
      state,
      { payload }: PayloadAction<{ id: string; text: string }>,
    ) => {
      if (payload.text.trim()) {
        const newArr = state.map((comment) => {
          if (comment.id === payload.id) {
            comment.text = payload.text;
          }
          return comment;
        });
      }
    },
  },
  extraReducers: {
    [cardsSlice.actions.onCardDelete.type]: (
      state,
      { payload }: PayloadAction<{ cardId: string }>,
    ) => {
      const filteredComments = state.filter((comment) => {
        return payload.cardId !== comment.card;
      });
      return filteredComments;
    },
  },
});

const showCardSlice = createSlice({
  name: 'cardToShow',
  initialState: '',
  reducers: {
    setNewCard: (state, { payload }: PayloadAction<{ cardId: string }>) => {
      return payload.cardId;
    },
    clearId: () => {
      return '';
    },
  },
  extraReducers: {
    [cardsSlice.actions.onCardDelete.type]: (state) => {
      return '';
    },
  },
});

const createCardColumnIdSlice = createSlice({
  name: 'createCardColumnId',
  initialState: '',
  reducers: {
    setNewColumnId: (
      state,
      { payload }: PayloadAction<{ columnId: string }>,
    ) => {
      return payload.columnId;
    },
    clearId: () => {
      return '';
    },
  },
});

const escListenerSlice = createSlice({
  name: 'escListener',
  initialState: false,
  reducers: {
    setListener: (state) => {
      return true;
    },
  },
});

export const {
  setNewColumnId: setNewCreateCardIdActionCreator,
  clearId: clearNewCreateCardIdActionCreator,
} = createCardColumnIdSlice.actions;

export const { setListener: setListenerActionCreator } =
  escListenerSlice.actions;

export const {
  setNewCard: setNewCardIdActionCreator,
  clearId: clearShowCardIdActionCreator,
} = showCardSlice.actions;

export const {
  create: createCommentdActionCreator,
  onDelete: onCommentDeleteActionCreator,
  changeText: changeCommentTextActionCreator,
} = commentsSlice.actions;

export const {
  onCardChecked: onCardCheckedActionCreator,
  onCardDelete: onCardDeleteActionCreator,
  create: createCardActionCreator,
  changeTitle: changeCardTitleActionCreator,
  changeText: changeCardTextActionCreator,
} = cardsSlice.actions;

export const { changeTitle: changeColumnTitleActionCreator } =
  columnsSlice.actions;

export const { setUser: setUserActionCreator } = userSlice.actions;

const persistConfig = {
  key: 'root',
  storage,
};

const reducer = combineReducers({
  cards: cardsSlice.reducer,
  columns: columnsSlice.reducer,
  comments: commentsSlice.reducer,
  user: userSlice.reducer,
  escListener: escListenerSlice.reducer,
  showCard: showCardSlice.reducer,
  createCardColumnId: createCardColumnIdSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);
