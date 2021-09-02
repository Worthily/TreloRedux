import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeCommentTextActionCreator } from '../../store/actions';

function CommentChange(props: {
  id: string;
  text: string;
  setChange(status: boolean): void;
  setText(text: string): void;
}) {
  const [text, setText] = useState(props.text);
  const dispatch = useDispatch();

  function onValueChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    setText(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const test = text.replace(/\s/g, '');
    if (test !== '') {
      dispatch(changeCommentTextActionCreator({ id: props.id, text: text }));
      props.setChange(false);
      props.setText(text);
    }
  }
  return (
    <form onSubmit={onSubmit} className="comment__form">
      <textarea
        value={text}
        onChange={onValueChange}
        className="comment__text"></textarea>
      <button className="comment__submit-btn">ОК</button>
    </form>
  );
}

export default CommentChange;
