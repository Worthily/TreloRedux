/*
 * типы экшенов
 */

export const ADD_TODO = 'ADD_TODO';
export const TOGGLE_TODO = 'TOGGLE_TODO';
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

/*
 * другие константы
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

/*
 * генераторы экшенов
 */

export function inc(value: number): { type: string; value: number } {
  return { type: ADD_TODO, value };
}

export function toggleTodo(index: number) {
  return { type: TOGGLE_TODO, index };
}

export function setVisibilityFilter(filter: string) {
  return { type: SET_VISIBILITY_FILTER, filter };
}
