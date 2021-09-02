import {
  userSlice,
  columnsSlice,
  cardsSlice,
  commentsSlice,
  showCardSlice,
  createCardColumnIdSlice,
} from './reducer';

export const {
  setNewColumnId: setNewCreateCardIdActionCreator,
  clearId: clearNewCreateCardIdActionCreator,
} = createCardColumnIdSlice.actions;

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
