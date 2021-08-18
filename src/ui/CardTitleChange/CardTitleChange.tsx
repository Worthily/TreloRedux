import React from 'react';

function CardTitleChange(props: {
  title: string;
  setTitle(title: string): void;
  onTitleChange(title: string): void;
  setTitleChange(status: boolean): void;
}) {
  function onTitleValueChange(e: React.FormEvent<HTMLInputElement>): void {
    if (e.currentTarget.value.trim()) {
      props.setTitle(e.currentTarget.value);
    } else {
      props.setTitle('');
    }
  }

  function onTitleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (props.title.trim()) {
      props.onTitleChange(props.title);
      props.setTitle(props.title);
      props.setTitleChange(false);
    }
  }

  return (
    <div className="show-card__header-wrapper">
      <form onSubmit={onTitleSubmit} className="show-card__change-header-form">
        <input
          value={props.title}
          onChange={onTitleValueChange}
          className="show-card__change-header-inp"
        />
        <button type="submit" className="show-card__change-header-btn">
          OK
        </button>
      </form>
    </div>
  );
}
export default CardTitleChange;
