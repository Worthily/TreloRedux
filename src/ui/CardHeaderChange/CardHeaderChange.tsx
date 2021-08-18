import React from 'react';

function CardHeaderChange(props: {
  header: string;
  setHeader(header: string): void;
  onHeaderChange(header: string): void;
  setHeaderChange(status: boolean): void;
}) {
  function onHeaderValueChange(e: React.FormEvent<HTMLInputElement>): void {
    if (e.currentTarget.value.trim()) {
      props.setHeader(e.currentTarget.value);
    } else {
      props.setHeader('');
    }
  }

  function onHeaderSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (props.header.trim()) {
      props.onHeaderChange(props.header);
      props.setHeader(props.header);
      props.setHeaderChange(false);
    }
  }

  return (
    <div className="show-card__header-wrapper">
      <form onSubmit={onHeaderSubmit} className="show-card__change-header-form">
        <input
          value={props.header}
          onChange={onHeaderValueChange}
          className="show-card__change-header-inp"
        />
        <button type="submit" className="show-card__change-header-btn">
          OK
        </button>
      </form>
    </div>
  );
}
export default CardHeaderChange;
