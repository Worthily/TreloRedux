import React, { useState } from 'react';
import Card from '../Card';
import AddCardBtn from '../../ui/AddCardBtn';
import changeImg from '../../assets/img/change.png';
import ColumnTitleChange from '../../ui/ColumnTitleChange';
import { Columns, State } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import {
  changeColumnTitleActionCreator,
  setNewCreateCardIdActionCreator,
} from '../../store';

function Column(props: { column: Columns; commentsCount(id: string): number }) {
  const { id, title } = props.column;
  const cards = useSelector((state: State) => state.cards);
  const { commentsCount } = props;
  const [columnTitle, setTitle] = useState(title);
  const [change, setChange] = useState(false);
  const dispatch = useDispatch();

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
        getNewTitle={(title: string) => {
          dispatch(
            changeColumnTitleActionCreator({ columnId: id, newTitle: title }),
          );
        }}
        setChange={(status: boolean) => {
          setChange(status);
        }}
      />
    );
  }
  const elements = cards.map((item) => {
    if (item && item.columnId === id) {
      return (
        <li key={item.id} className="column__card-item">
          <Card card={item} commentsCount={() => commentsCount(item.id)} />
        </li>
      );
    }
  });

  return (
    <div className="column">
      {heading}
      <ul className="column__card-wrapper">{elements}</ul>
      <AddCardBtn
        createCard={() =>
          dispatch(setNewCreateCardIdActionCreator({ columnId: id }))
        }
      />
    </div>
  );
}

export default Column;
