import React from 'react';
import { useSelector } from 'react-redux';
import Column from './components/Column';
import LoginPopup from './components/LoginPopup';
import CreateCard from './components/CreateCard';
import ShowCardPopup from './components/ShowCardPopup';
import { Comments, State } from './types';

function App() {
  const user = useSelector((state: State) => state.user);
  const cards = useSelector((state: State) => state.cards);
  const comments = useSelector((state: State) => state.comments);
  const columns = useSelector((state: State) => state.columns);
  const createCardId = useSelector((state: State) => state.createCardColumnId);
  const showCardId = useSelector((state: State) => state.showCard);

  function commentsCount(id: string) {
    let count = 0;
    for (let i = 0; i < comments.length; i++) {
      if (id === comments[i].card) {
        count++;
      }
    }
    return count;
  }

  let showCardPopup: JSX.Element = <></>;
  if (showCardId !== '') {
    const card = cards.find((elem) => elem.id === showCardId);

    if (card) {
      const column = columns.find((item) => card.columnId === item.id);

      if (column) {
        const cardComments: Comments[] = [];

        for (let item of comments) {
          if (card.id === item.card) {
            cardComments.push(item);
          }
        }

        showCardPopup = (
          <ShowCardPopup
            card={card}
            column={column.title}
            cardComments={cardComments}
          />
        );
      }
    }
  } else {
    showCardPopup = <></>;
  }

  const columnItems = columns.map((item) => {
    return (
      <li key={item.id} className="app__column-item">
        <Column column={item} commentsCount={commentsCount} />
      </li>
    );
  });

  return (
    <header className="app">
      {showCardPopup}
      {createCardId !== '' ? <CreateCard /> : <></>}
      {user === '' ? (
        <LoginPopup />
      ) : (
        <div className="login-popup__logged-wrapper">
          <span className="login-popup__logged-str">
            Приветствуем в Trello, {user}
          </span>
        </div>
      )}
      <ul className="app__column-wrapper">{columnItems}</ul>
    </header>
  );
}

export default App;
