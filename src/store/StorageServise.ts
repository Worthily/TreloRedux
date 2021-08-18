import { cards, columns, comments, user } from '../types';

class StorageServise {
  private userKey = 'user';
  private cardsKey = 'cards';
  private commentsKey = 'comments';
  private columnsKey = 'columns';

  getUser() {
    let user = localStorage.getItem(this.userKey);
    if (user == null) {
      this.setUser('');
      user = '';
    }
    return user;
  }

  setUser(user: user) {
    localStorage.setItem(this.userKey, user);
  }

  getCards() {
    let cards: cards[];
    const cardsStr = localStorage.getItem(this.cardsKey);
    if (cardsStr != null) {
      cards = JSON.parse(cardsStr);
    } else {
      cards = [
        {
          id: 'w1',
          title: 'Отчет',
          text: 'Лишь сделанные на базе интернет-аналитики выводы ассоциативно распределены по отраслям. Как принято считать, акционеры крупнейших компаний освещают чрезвычайно интересные особенности картины в целом, однако',
          checked: false,
          author: 'Дмитрий',
          columnId: 'ToDo',
        },
      ];
      this.setCards(cards);
    }
    return cards;
  }

  setCards(cards: cards[]) {
    localStorage.setItem(this.cardsKey, JSON.stringify(cards));
  }

  getColumns() {
    let columns: columns[];
    const columnsStr = localStorage.getItem(this.columnsKey);
    if (columnsStr != null) {
      columns = JSON.parse(columnsStr);
    } else {
      columns = [
        { id: 'ToDo', title: 'To Do' },
        { id: 'InProgress', title: 'In progress' },
        { id: 'Testing', title: 'Testing' },
        { id: 'Done', title: 'Done' },
      ];
      this.setColumns(columns);
    }
    return columns;
  }

  setColumns(columns: columns[]) {
    localStorage.setItem(this.columnsKey, JSON.stringify(columns));
  }

  getComments() {
    let comments: comments[];
    const commentsStr = localStorage.getItem(this.commentsKey);

    if (commentsStr != null) {
      comments = JSON.parse(commentsStr);
    } else {
      comments = [
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
      this.setComments(comments);
    }
    return comments;
  }

  setComments(comments: comments[]) {
    localStorage.setItem(this.commentsKey, JSON.stringify(comments));
  }
}

export default StorageServise;
