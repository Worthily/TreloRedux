import React, { useState } from 'react';

function CommentChange(props: {
  id: string;
  text: string;
  onChange(id: string, text: string): void;
  setChange(status: boolean): void;
  setText(text: string): void;
}) {
  const [text, setText] = useState(props.text);
  function onValueChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    setText(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const test = text.replace(/\s/g, '');
    if (test !== '') {
      props.onChange(props.id, text);
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
