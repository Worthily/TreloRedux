import React from 'react';
import commentImg from '../../assets/img/comment.png';
import notCheckImg from '../../assets/img/viewblack.png';
import checkImg from '../../assets/img/viewgreen.png';
import dellImg from '../../assets/img/delete.svg';
import CommentsCount from '../CommentsCount';
import { cards } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import {
  onCardCheckedActionCreator,
  onCardDeleteActionCreator,
} from '../../store';

function Card(props: {
  card: cards;
  onShowPopup(): void;
  commentsCount(): number;
}) {
  const dispatch = useDispatch();
  const { card, onShowPopup, commentsCount } = props;

  const btnImgSrc = card.checked ? checkImg : notCheckImg;

  return (
    <div className="column__card card">
      <div onClick={onShowPopup} className="card__info-wrapper">
        <h2 className="card__header">{card.title}</h2>
        <p className="card__autor">{card.author}</p>
        <div className="card__text-wrapper">
          <p className="card__text">{card.text}</p>
        </div>
      </div>
      <div className="card__buttons-wrapper">
        <div
          onClick={() => {
            dispatch(onCardCheckedActionCreator({ cardId: card.id }));
          }}
          className="card__checked-btn card__btn">
          <img src={btnImgSrc} alt="checked" className="card__checked-img" />
        </div>
        <div className="card__comments-btn card__btn">
          {<CommentsCount count={commentsCount} />}
          <img src={commentImg} alt="comment" className="card__comment-img" />
        </div>
        <div
          onClick={() => {
            dispatch(onCardDeleteActionCreator({ cardId: card.id }));
          }}
          className="card__dell-btn card__btn">
          <img src={dellImg} alt="delete" className="card__dell-img" />
        </div>
      </div>
    </div>
  );
}

export default Card;
