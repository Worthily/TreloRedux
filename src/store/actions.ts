import { cards, comments, user } from '../types';

export const SET_USER = 'SET_USER';
export const SET_CARD_CHECKED = 'SET_CARD_CHECKED';
export const DELETE_CARD = 'DELETE_CARD';
export const CHANGE_CARD_HEADER = 'CHANGE_CARD_HEADER';

export function setUser(userName: user): { type: string; value: string } {
  return { type: SET_USER, value: userName };
}

export function setCardChecked(userName: user): {
  type: string;
  value: string;
} {
  return { type: SET_CARD_CHECKED, value: userName };
}

export function onCardDelete(id: string): {
  type: string;
  value: string;
} {
  return { type: DELETE_CARD, value: id };
}
