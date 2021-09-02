import React, { useState } from 'react';
import dellImg from '../../assets/img/delete.svg';
import changeBtn from '../../assets/img/change-white.png';
import CommentChange from '../../ui/CommentChange';
import { Comments } from '../../types';
import { useDispatch } from 'react-redux';
import { onCommentDeleteActionCreator } from '../../store';

function Comment(props: { comment: Comments }) {
  const dispatch = useDispatch();
  const { comment } = props;
  const [text, setText] = useState(comment.text);
  const [change, setChange] = useState(false);

  function onStartChange() {
    setChange(true);
  }

  let commentBody: JSX.Element;

  if (!change) {
    commentBody = (
      <>
        <div className="comment__text-wrapper">
          <p className="comment__author">{comment.author}</p>
          <p className="comment__text">{text}</p>
        </div>
        <div className="comment__buttons-wrapper">
          <div onClick={onStartChange} className="comment__change-btn">
            <img
              src={changeBtn}
              alt="change"
              className="comment__change-btn-img"
            />
          </div>
          <div
            onClick={() => {
              dispatch(onCommentDeleteActionCreator({ ids: [comment.id] }));
            }}
            className="comment__dell-btn">
            <img src={dellImg} alt="delete" className="comment__dell-btn-img" />
          </div>
        </div>
      </>
    );
  } else {
    commentBody = (
      <CommentChange
        id={comment.id}
        text={text}
        setChange={setChange}
        setText={(text: string) => {
          setText(text);
        }}
      />
    );
  }

  return <div className="comment">{commentBody}</div>;
}

export default Comment;
