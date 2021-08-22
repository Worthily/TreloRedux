import { cards, comments, user } from '../types';

export const SET_USER = 'SET_USER';

export function getUser(userName: user): { type: string; value: string } {
  return { type: SET_USER, value: userName };
}
