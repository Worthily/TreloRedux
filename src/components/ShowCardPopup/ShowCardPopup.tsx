import React, { useState, useEffect } from 'react';
import dellImg from '../../assets/img/delete.svg';
import closeImg from '../../assets/img/close.png';
import sendBtn from '../../assets/img/send-button.png';
import changeBtn from '../../assets/img/change-white.png';
import Comment from '../Comment';
import CardEditForm from '../../ui/CardEditForm';
import { Cards, Comments, State } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import {
  createCommentdActionCreator,
  onCardDeleteActionCreator,
  clearShowCardIdActionCreator,
} from '../../store/actions';
import { Form, Field } from 'react-final-form';

function ShowCardPopup(props: {
  column: string;
  card: Cards;
  cardComments: Comments[];
}) {
  const dispatch = useDispatch();
  const user = useSelector((state: State) => state.user);

  const { id, title, text, author } = props.card;
  const [cardChange, setCardChange] = useState(false);
  const [commentText] = useState('');
  const [cardTitle, setTitle] = useState(title);
  const [cardText, setText] = useState(text);

  let cardElement: JSX.Element;
  if (!cardChange) {
    cardElement = (
      <>
        <div className="show-card__top">
          <div className="show-card__header-wrapper">
            <h2 className="show-card__header">{title}</h2>
            <div
              onClick={() => {
                setCardChange(true);
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
          <p className="show-card__text">{text}</p>
        </div>
      </>
    );
  } else {
    cardElement = (
      <CardEditForm
        id={id}
        title={cardTitle}
        text={cardText}
        setText={(text) => {
          setText(text);
        }}
        setTitle={(title) => {
          setTitle(title);
        }}
        setCardChange={() => {
          setCardChange(false);
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
    <div
      tabIndex={-1}
      className="show-card"
      onKeyDown={(e: React.KeyboardEvent) => {
        if (e.keyCode === 27) {
          dispatch(clearShowCardIdActionCreator());
        }
      }}
      onClick={() => {
        dispatch(clearShowCardIdActionCreator());
      }}>
      <div className="show-card__wrapper" onClick={(e) => e.stopPropagation()}>
        {cardElement}
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
