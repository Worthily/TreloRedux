import React, { useState } from 'react';
import dellImg from '../../assets/img/delete.svg';
import closeImg from '../../assets/img/close.png';
import sendBtn from '../../assets/img/send-button.png';
import changeBtn from '../../assets/img/change-white.png';
import Comment from '../Comment';
import CardTitleChange from '../../ui/CardTitleChange';
import CardTextChange from '../../ui/CardTextChange';
import { cards, comments, user, columns } from '../../types';

function ShowCardPopup(props: {
  column: string;
  card: cards;
  cardComments: comments[];
  listener: boolean;
  OnCardDelete(id: string): void;
  OnClose(): void;
  addListener(): void;
  onTitleChange(id: string, title: string): void;
  onTextChange(id: string, text: string): void;
  onDeleteComments(id: string[]): void;
  onChangeComments(id: string, text: string): void;
  onCommentAdd(id: string, text: string): void;
}) {
  const { id, title, text, author } = props.card;
  const [titleChange, setTitleChange] = useState(false);
  const [textChange, setTextChange] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [cardTitle, setTitle] = useState(title);
  const [cardText, setText] = useState(text);

  function addListen() {
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) {
        props.addListener();
        props.OnClose();
      }
    });
  }

  function onCommentValueChange(e: React.FormEvent<HTMLInputElement>): void {
    if (e.currentTarget.value !== '') {
      setCommentText(e.currentTarget.value);
    }
  }

  function onCommentSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (commentText.trim()) {
      props.onCommentAdd(id, commentText);
    }
    setCommentText('');
  }

  if (!props.listener) {
    addListen();
  }

  let headerTop: JSX.Element;
  if (!titleChange) {
    headerTop = (
      <div className="show-card__header-wrapper">
        <h2 className="show-card__header">{title}</h2>
        <div
          onClick={() => {
            setTitleChange(true);
          }}
          className="show-card__header-chenge-btn">
          <img
            src={changeBtn}
            alt="changeBtn"
            className="show-card__header-chenge-btn-img"
          />
        </div>
        <p className="show-card__author">{author}</p>
        <p className="show-card__column">Колонка: {props.column}</p>
      </div>
    );
  } else {
    headerTop = (
      <CardTitleChange
        title={cardTitle}
        setTitle={(title: string) => {
          setTitle(title);
        }}
        onTitleChange={(title: string) => {
          props.onTitleChange(id, title);
        }}
        setTitleChange={(status: boolean) => {
          setTitleChange(status);
        }}
      />
    );
  }

  let cardTextElement: JSX.Element;
  if (!textChange) {
    cardTextElement = (
      <>
        <div
          onClick={() => {
            setTextChange(true);
          }}
          className="show-card__text-chenge-btn">
          <img
            src={changeBtn}
            alt="changeBtn"
            className="show-card__text-chenge-btn-img"
          />
        </div>
        <p className="show-card__text">{text}</p>
      </>
    );
  } else {
    cardTextElement = (
      <CardTextChange
        text={cardText}
        setText={(text: string) => {
          setText(text);
        }}
        onTextChange={(text: string) => {
          props.onTextChange(id, text);
        }}
        setTextChange={(status: boolean) => {
          setTextChange(status);
        }}
      />
    );
  }

  const comments = props.cardComments.map(
    // eslint-disable-next-line
    (item: { id: string; author: string; text: string; card: string }) => {
      if (item) {
        return (
          <li key={item.id} className="show-card__comment-item">
            <Comment
              comment={item}
              onDelete={props.onDeleteComments}
              onChange={props.onChangeComments}
            />
          </li>
        );
      }
    },
  );

  return (
    <div className="show-card">
      <div className="show-card__wrapper">
        <div className="show-card__top">
          {headerTop}
          <div
            onClick={() => props.OnCardDelete(id)}
            className="show-card__dell-btn">
            <img src={dellImg} alt="dell" className="show-card__dell-btn-img" />
          </div>
          <div onClick={() => props.OnClose()} className="show-card__close-btn">
            <img
              src={closeImg}
              alt="close"
              className="show-card__close-btn-img"
            />
          </div>
        </div>
        <div className="show-card__text-wrapper">
          <p className="show-card__text-prefix">Описание:</p>
          {cardTextElement}
        </div>
        <form onSubmit={onCommentSubmit} className="show-card__comment-form">
          <input
            onChange={onCommentValueChange}
            type="text"
            value={commentText}
            placeholder="Оставить комментарий"
            className="show-card__comment-input"
          />
          <button className="show-card__comment-send-btn">
            <img
              src={sendBtn}
              alt="send"
              className="show-card__comment-send-btn-img"
            />
          </button>
        </form>
        <ul className="show-card__comment-wrapper">{comments}</ul>
      </div>
    </div>
  );
}

export default ShowCardPopup;
