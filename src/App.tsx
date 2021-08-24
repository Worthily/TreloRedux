import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Column from './components/Column';
import LoginPopup from './components/LoginPopup';
import CreateCard from './components/CreateCard';
import ShowCardPopup from './components/ShowCardPopup';
import StorageServise from './store/StorageServise';
import { cards, comments, user, columns, state } from './types';

function App() {
  const appStorage = new StorageServise();
  const dispatch = useDispatch();
  const user = useSelector((state: state) => state.user);
  const [cards, setCards] = useState(appStorage.getCards());
  const [comments, setComments] = useState(appStorage.getComments());
  const [columns, setColumns] = useState(appStorage.getColumns());
  const [createCardId, setCreateCardId] = useState('');
  const [showCardId, setShowCardId] = useState('');
  const [listenerESC, setListenerESC] = useState(false);

  // function onCradChecked(id: string): void {
  //   const newArr = cards.map((item) => {
  //     if (item.id === id) {
  //       return { ...item, checked: !item.checked };
  //     }
  //     return item;
  //   });
  //   appStorage.setCards(newArr);
  //   setCards(newArr);
  // }

  // function getUser(userName: user): void {
  //   if (userName !== user) {
  //     appStorage.setUser(userName);
  //   }
  // }

  // все
  function onCardDelete(id: string): void {
    let newArr: cards[] = cards.filter((elem) => {
      return elem.id !== id;
    });

    appStorage.setCards(newArr);
    setCards(newArr);
    setShowCardId('');

    const commentsId: string[] = [];
    for (const item of comments) {
      if (item.card === id) {
        commentsId.push(item.id);
      }
    }

    onDeleteComments(commentsId);
  }
  // все
  function changeColumnTitle(id: string, newTitle: string): void {
    if (newTitle.trim()) {
      const newArr = columns.map((item) => {
        if (item.id === id) {
          return { ...item, title: newTitle };
        }
        return item;
      });
      appStorage.setColumns(newArr);
      setColumns(newArr);
    }
  }

  function showCreateCardPopup(id: string): void {
    setCreateCardId(id);
  }
  // все
  function createCard(cardTitle: string, cardText: string) {
    if (cardTitle.trim() && cardText.trim()) {
      let id = 0;
      let success = false;
      const cardsId: string[] = [];

      for (let i = 0; i < cards.length; i++) {
        cardsId.push(cards[i].id);
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
        title: cardTitle,
        text: cardText,
        checked: false,
        author: 'asd', // todo
        columnId: createCardId,
      };

      const newCards = [...cards, card];
      appStorage.setCards(newCards);
      setCards(newCards);
      setCreateCardId('');
    } else {
      setCreateCardId('');
    }
  }

  function onShowCardPopup(id: string): void {
    setShowCardId(id);
  }

  function onCloseCardPopup(): void {
    setShowCardId('');
  }

  function addListener(): void {
    setListenerESC(true);
  }
  // все
  function changeCardTitle(id: string, title: string) {
    if (title.trim()) {
      const newArr = cards.map((item) => {
        if (item.id === id) {
          return { ...item, title };
        }
        return item;
      });
      appStorage.setCards(newArr);
      setCards(newArr);
    }
  }
  // все
  function changeCardText(id: string, text: string) {
    if (text.trim()) {
      const newArr = cards.map((item) => {
        if (item.id === id) {
          return { ...item, text };
        }
        return item;
      });
      appStorage.setCards(newArr);
      setCards(newArr);
    }
  }
  // все
  const onDeleteComments = (ids: string[]) => {
    const filteredComments = comments.filter((comment) => {
      return !ids.includes(comment.id);
    });
    appStorage.setComments(filteredComments);
    setComments(filteredComments);
  };
  // все
  function onChangeComments(id: string, text: string) {
    if (text.trim()) {
      const newArr = comments.map((item) => {
        if (item.id === id) {
          return { ...item, text };
        }
        return item;
      });
      appStorage.setComments(newArr);
      setComments(newArr);
    }
  }
  // все
  function onCommentAdd(id: string, text: string) {
    if (text.trim()) {
      let commentId = 0;
      let success = false;
      const commentsId: string[] = [];

      for (let item of comments) {
        commentsId.push(item.id);
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
        card: id,
        author: 'asd', //todo
        text: text,
      };

      const newArr = [...comments, comment];
      appStorage.setComments(newArr);
      setComments(newArr);
    }
  }

  function commentsCount(id: string) {
    let count = 0;
    for (let i = 0; i < comments.length; i++) {
      if (id === comments[i].card) {
        count++;
      }
    }
    return count;
  }

  // end

  let showCardPopup: JSX.Element = <></>;
  if (showCardId !== '') {
    const card = cards.find((elem) => elem.id === showCardId);

    if (card !== undefined) {
      const column = columns.find((item) => card.columnId === item.id);

      if (column !== undefined) {
        const cardComments: comments[] = [];

        for (let item of comments) {
          if (card.id === item.card) {
            cardComments.push(item);
          }
        }

        showCardPopup = (
          <ShowCardPopup
            card={card}
            column={column.title}
            OnCardDelete={onCardDelete}
            OnClose={onCloseCardPopup}
            listener={listenerESC}
            addListener={addListener}
            onTitleChange={changeCardTitle}
            onTextChange={changeCardText}
            cardComments={cardComments}
            onDeleteComments={onDeleteComments}
            onChangeComments={onChangeComments}
            onCommentAdd={onCommentAdd}
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
        <Column
          column={item}
          cards={cards}
          changeColumnTitle={changeColumnTitle}
          createCard={showCreateCardPopup}
          onShowPopup={onShowCardPopup}
          commentsCount={commentsCount}
        />
      </li>
    );
  });

  return (
    <header className="app">
      {showCardPopup}
      {createCardId !== '' ? <CreateCard createCard={createCard} /> : <></>}
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
