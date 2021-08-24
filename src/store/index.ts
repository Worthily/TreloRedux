import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { cards, columns, comments, user } from '../types';
import StorageServise from './StorageServise';

const appStorage = new StorageServise();

const cardsInitialState: cards[] = appStorage.getCards();
const columnsInitialState: columns[] = appStorage.getColumns();
const commentsInitialState: comments[] = appStorage.getComments();
const userInitialState: user = appStorage.getUser();

const cardsSlice = createSlice({
  name: 'cards',
  initialState: cardsInitialState,
  reducers: {
    onCardChecked: (state, { payload }: PayloadAction<{ cardId: string }>) => {
      const newArr = state.map((item) => {
        if (item.id === payload.cardId) {
          return { ...item, checked: !item.checked };
        }
        return item;
      });
      appStorage.setCards(newArr);
      return newArr;
    },
    onCardDelete: (state, { payload }: PayloadAction<{ cardId: string }>) => {
      let newArr: cards[] = state.filter((elem) => {
        return elem.id !== payload.cardId;
      });
      appStorage.setCards(newArr);
      return newArr;
    },
  },
});

const columnsSlice = createSlice({
  name: 'columns',
  initialState: columnsInitialState,
  reducers: {},
});

const commentsSlice = createSlice({
  name: 'comments',
  initialState: commentsInitialState,
  reducers: {},
  extraReducers: {
    [cardsSlice.actions.onCardDelete.type]: (
      state,
      { payload }: PayloadAction<{ cardId: string }>,
    ) => {
      const filteredComments = state.filter((comment) => {
        return payload.cardId !== comment.card;
      });
      appStorage.setComments(filteredComments);
    },
  },
});

const userSlice = createSlice({
  name: 'user',
  initialState: userInitialState,
  reducers: {
    setUser: (state, { payload }: PayloadAction<{ userName: user }>) => {
      if (payload.userName !== state) {
        appStorage.setUser(payload.userName);
        return payload.userName;
      }
    },
  },
});

// const todosSlice = createSlice({
//   name: 'todos',
//   initialState: todosInitialState,
//   reducers: {
//     create: {
//       reducer: (
//         state,
//         {
//           payload,
//         }: PayloadAction<{ id: string; desc: string; isComplete: boolean }>,
//       ) => {
//         state.push(payload);
//       },
//       prepare: ({ desc }: { desc: string }) => ({
//         payload: {
//           id: '1',
//           desc,
//           isComplete: false,
//         },
//       }),
//     },
//     edit: (state, { payload }: PayloadAction<{ id: string; desc: string }>) => {
//       const index = state.findIndex((todo) => todo.id === payload.id);
//       if (index !== -1) {
//         state[index].desc = payload.desc;
//       }
//     },
//     toggle: (
//       state,
//       { payload }: PayloadAction<{ id: string; isComplete: boolean }>,
//     ) => {
//       const index = state.findIndex((todo) => todo.id === payload.id);
//       if (index !== -1) {
//         state[index].isComplete = payload.isComplete;
//       }
//     },
//     remove: (state, { payload }: PayloadAction<{ id: string }>) => {
//       const index = state.findIndex((todo) => todo.id === payload.id);
//       if (index !== -1) {
//         state.splice(index, 1);
//       }
//     },
//   },
// });

// const selectedTodoSlice = createSlice({
//   name: 'selectedTodo',
//   initialState: null as string | null,
//   reducers: {
//     select: (_state, { payload }: PayloadAction<{ id: string }>) => payload.id,
//   },
// });

// const counterSlice = createSlice({
//   name: 'counter',
//   initialState: 0,
//   reducers: {},
//   extraReducers: {
//     [todosSlice.actions.create.type]: (state) => state + 1,
//     [todosSlice.actions.edit.type]: (state) => state + 1,
//     [todosSlice.actions.toggle.type]: (state) => state + 1,
//     [todosSlice.actions.remove.type]: (state) => state + 1,
//   },
// });

// export const {
//   create: createTodoActionCreator,
//   edit: editTodoActionCreator,
//   toggle: toggleTodoActionCreator,
//   remove: deleteTodoActionCreator,
// } = todosSlice.actions;

export const {
  onCardChecked: onCardCheckedActionCreator,
  onCardDelete: onCardDeleteActionCreator,
} = cardsSlice.actions;

export const { setUser: setUserActionCreator } = userSlice.actions;

const reducer = {
  cards: cardsSlice.reducer,
  columns: columnsSlice.reducer,
  comments: commentsSlice.reducer,
  user: userSlice.reducer,
};

export default configureStore({
  reducer,
});
