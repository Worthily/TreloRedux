import React from 'react';

function CardTextChange(props: {
  text: string;
  setText(text: string): void;
  onTextChange(text: string): void;
  setTextChange(status: boolean): void;
}) {
  function onTextValueChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    if (e.currentTarget.value.trim()) {
      props.setText(e.currentTarget.value);
    } else {
      props.setText('');
    }
  }

  function onTextSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (props.text.trim()) {
      props.onTextChange(props.text);
      props.setText(props.text);
      props.setTextChange(false);
    }
  }

  return (
    <form onSubmit={onTextSubmit} className="show-card__change-text-form">
      <textarea
        onChange={onTextValueChange}
        className="show-card__change-text-inp"
        value={props.text}
      />
      <button type="submit" className="show-card__change-text-btn">
        OK
      </button>
    </form>
  );
}

export default CardTextChange;
