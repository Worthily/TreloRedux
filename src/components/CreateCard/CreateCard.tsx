import React, { useState } from 'react';
import { cards, comments, user, columns, state } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import {
  createCardActionCreator,
  clearNewCreateCardIdActionCreator,
} from '../../store';

function CreateCard() {
  const dispatch = useDispatch();
  const user = useSelector((state: state) => state.user);
  const columnId = useSelector((state: state) => state.createCardColumnId);

  const [title, setTitle] = useState('');
  const [text, setText] = useState('');

  function onTitleChange(e: React.FormEvent<HTMLInputElement>): void {
    setTitle(e.currentTarget.value);
  }

  function onTextChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    setText(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (title.trim() && text.trim()) {
      dispatch(
        createCardActionCreator({
          title: title,
          text: text,
          author: user,
          column: columnId,
        }),
      );
      dispatch(clearNewCreateCardIdActionCreator());
      setTitle('');
      setText('');
    }
  }

  return (
    <div className="createcard">
      <div className="createcard__wrapper">
        <h2 className="createcard__header">Создание карточки</h2>
        <form onSubmit={onSubmit} className="createcard__form">
          <input
            placeholder="Заголовок"
            onChange={onTitleChange}
            type="text"
            className="createcard__header-input"
          />
          <textarea
            placeholder="Текст карточки"
            onChange={onTextChange}
            name="inputText"
            className="createcard__text-input"></textarea>
          <button type="submit" className="createcard__btn">
            OK
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreateCard;
