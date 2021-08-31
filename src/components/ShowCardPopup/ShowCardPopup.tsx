import React, { useState } from 'react';
import dellImg from '../../assets/img/delete.svg';
import closeImg from '../../assets/img/close.png';
import sendBtn from '../../assets/img/send-button.png';
import changeBtn from '../../assets/img/change-white.png';
import Comment from '../Comment';
import CardTitleChange from '../../ui/CardTitleChange';
import CardTextChange from '../../ui/CardTextChange';
import { cards, comments, state } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import {
  createCommentdActionCreator,
  onCardDeleteActionCreator,
  changeCardTitleActionCreator,
  changeCardTextActionCreator,
  clearShowCardIdActionCreator,
  setListenerActionCreator,
} from '../../store';
import { Form, Field } from 'react-final-form';

function ShowCardPopup(props: {
  column: string;
  card: cards;
  cardComments: comments[];
}) {
  const dispatch = useDispatch();
  const user = useSelector((state: state) => state.user);
  const listener = useSelector((state: state) => state.escListener);

  const { id, title, text, author } = props.card;
  const [titleChange, setTitleChange] = useState(false);
  const [textChange, setTextChange] = useState(false);
  const [commentText] = useState('');
  const [cardTitle, setTitle] = useState(title);
  const [cardText, setText] = useState(text);

  function addListen() {
    document.addEventListener('keyup', (event) => {
      if (event.keyCode === 27) {
        dispatch(setListenerActionCreator());
        dispatch(clearShowCardIdActionCreator());
      }
    });
  }

  if (!listener) {
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
          dispatch(changeCardTitleActionCreator({ cardId: id, title: title }));
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
          dispatch(changeCardTextActionCreator({ cardId: id, text: text }));
        }}
        setTextChange={(status: boolean) => {
          setTextChange(status);
        }}
      />
    );
  }

  const comments = props.cardComments.map(
    (item: { id: string; author: string; text: string; card: string }) => {
      if (item) {
        return (
          <li key={item.id} className="show-card__comment-item">
            <Comment comment={item} />
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
            onClick={() => dispatch(onCardDeleteActionCreator({ cardId: id }))}
            className="show-card__dell-btn">
            <img src={dellImg} alt="dell" className="show-card__dell-btn-img" />
          </div>
          <div
            onClick={() => dispatch(clearShowCardIdActionCreator())}
            className="show-card__close-btn">
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

        <Form
          onSubmit={(formObj: { text: string }) => {
            if (formObj.text) {
              if (formObj.text.trim()) {
                dispatch(
                  createCommentdActionCreator({
                    cardId: id,
                    author: user,
                    text: formObj.text,
                  }),
                );
              }
            }
          }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="show-card__comment-form">
              <Field
                name="text"
                type="text"
                value={commentText}
                placeholder="Оставить комментарий"
                className="show-card__comment-input">
                {({ input }) => (
                  <input className="show-card__comment-input" {...input} />
                )}
              </Field>
              <button type="submit" className="show-card__comment-send-btn">
                <img
                  src={sendBtn}
                  alt="send"
                  className="show-card__comment-send-btn-img"
                />
              </button>
            </form>
          )}
        </Form>

        <ul className="show-card__comment-wrapper">{comments}</ul>
      </div>
    </div>
  );
}

export default ShowCardPopup;
