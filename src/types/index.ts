export type Cards = {
  id: string;
  title: string;
  text: string;
  checked: boolean;
  author: string;
  columnId: string;
};

export type Columns = {
  id: string;
  title: string;
};

export type Comments = {
  id: string;
  author: string;
  text: string;
  card: string;
};

export type User = string;

export type State = {
  user: User;
  comments: Comments[];
  cards: Cards[];
  columns: Columns[];
  showCard: string;
  createCardColumnId: string;
};
