import React, { useState } from "react";
import dellImg from "../../assets/img/delete.svg";
import changeBtn from "../../assets/img/change-white.png";
import CommentChange from "../../ui/CommentChange";
import { comments } from "../../types";

function Comment(props: {
  comment: comments;
  onDelete(id: string[]): void;
  onChange(id: string, text: string): void;
}) {
  const { comment, onDelete, onChange } = props;
  const [text, setText] = useState(comment.text);
  const [change, setChange] = useState(false);

  function onStartChange() {
    setChange(true);
  }

  let commentBody: JSX.Element;

  if (change === false) {
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
              alt="delete"
              className="comment__change-btn-img"
            />
          </div>
          <div
            onClick={() => {
              const idArr: string[] = [];
              idArr.push(comment.id);
              onDelete(idArr);
            }}
            className="comment__dell-btn"
          >
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
        onChange={onChange}
        setText={(text: string) => {
          setText(text);
        }}
      />
    );
  }

  return <div className="comment">{commentBody}</div>;
}

export default Comment;
