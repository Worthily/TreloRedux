export type cards = {
  id: string;
  title: string;
  text: string;
  checked: boolean;
  author: string;
  columnId: string;
};

export type columns = {
  id: string;
  title: string;
};

export type comments = {
  id: string;
  author: string;
  text: string;
  card: string;
};

export type user = string;
