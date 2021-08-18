import React, { useState } from "react";
import Card from "../Card";
import AddCardBtn from "../../ui/AddCardBtn";
import changeImg from "../../assets/img/change.png";
import ColumnTitleChange from "../../ui/ColumnTitleChange";
import { cards, columns } from "../../types";

function Column(props: {
  column: columns;
  cards: cards[];
  onCardDelete(id: string): void;
  onCardChecked(id: string): void;
  changeColumnTitle(id: string, title: string): void;
  createCard(id: string): void;
  onShowPopup(id: string): void;
  commentsCount(id: string): number;
}) {
  const { id, title } = props.column;
  const {
    cards,
    onCardDelete,
    onCardChecked,
    createCard,
    onShowPopup,
    commentsCount,
  } = props;
  const [columnTitle, setTitle] = useState(title);
  const [change, setChange] = useState(false);

  function onChangeBtnClick(): void {
    setChange(!change);
  }

  let heading = (
    <div className="column__header-wrapper">
      <h2 className="column__header">{title}</h2>
      <div onClick={onChangeBtnClick} className="column__header-change-btn">
        <img src={changeImg} alt="change" />
      </div>
    </div>
  );

  if (change) {
    heading = (
      <ColumnTitleChange
        title={columnTitle}
        setTitle={(title: string) => {
          setTitle(title);
        }}
        getTitle={(title: string) => {
          props.changeColumnTitle(id, title);
        }}
        setChange={(status: boolean) => {
          setChange(status);
        }}
      />
    );
  }
  // eslint-disable-next-line
  const elements = cards.map((item) => {
    if (item && item.columnId === id) {
      return (
        <li key={item.id} className="column__card-item">
          <Card
            card={item}
            onCardDelete={() => onCardDelete(item.id)}
            onCardChecked={() => onCardChecked(item.id)}
            onShowPopup={() => onShowPopup(item.id)}
            commentsCount={() => commentsCount(item.id)}
          />
        </li>
      );
    }
  });

  return (
    <div className="column">
      {heading}
      <ul className="column__card-wrapper">{elements}</ul>
      <AddCardBtn createCard={() => createCard(id)} />
    </div>
  );
}

export default Column;
