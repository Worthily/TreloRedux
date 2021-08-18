import React from 'react';

function ColumnTitleChange(props: {
  title: string;
  setTitle(title: string): void;
  getTitle(title: string): void;
  setChange(status: boolean): void;
}) {
  function onValueChange(e: React.FormEvent<HTMLInputElement>): void {
    props.setTitle(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (props.title !== '') {
      props.getTitle(props.title);
      props.setChange(false);
    }
  }
  return (
    <div className="column__header-wrapper">
      <form onSubmit={onSubmit} className="column__form">
        <input
          onChange={onValueChange}
          className="column__input"
          value={props.title}
        />
        <button className="column__submit-btn">OK</button>
      </form>
    </div>
  );
}

export default ColumnTitleChange;
