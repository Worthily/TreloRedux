import React, { useState } from 'react';

function CreateCard(props: { createCard(title: string, text: string): void }) {
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
    if (title !== '' && text !== '') {
      props.createCard(title, text);
      setTitle('');
      setText('');
    } else {
      props.createCard(title, text);
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
