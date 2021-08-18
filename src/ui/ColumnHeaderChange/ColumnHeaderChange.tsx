import React from 'react';

function ColumnHeaderChange(props: {
  header: string;
  setHeader(header: string): void;
  getHeader(header: string): void;
  setChange(status: boolean): void;
}) {
  function onValueChange(e: React.FormEvent<HTMLInputElement>): void {
    props.setHeader(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (props.header !== '') {
      props.getHeader(props.header);
      props.setChange(false);
    }
  }
  return (
    <div className="column__header-wrapper">
      <form onSubmit={onSubmit} className="column__form">
        <input
          onChange={onValueChange}
          className="column__input"
          value={props.header}
        />
        <button className="column__submit-btn">OK</button>
      </form>
    </div>
  );
}

export default ColumnHeaderChange;
