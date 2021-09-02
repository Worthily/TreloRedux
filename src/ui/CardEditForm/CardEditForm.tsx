import React from 'react';
import { useDispatch } from 'react-redux';
import {
  changeCardTitleActionCreator,
  changeCardTextActionCreator,
} from '../../store/actions';

function CardEditForm(props: {
  id: string;
  text: string;
  title: string;
  setText(text: string): void;
  setCardChange(): void;
  setTitle(title: string): void;
}) {
  const dispatch = useDispatch();

  function onTitleValueChange(e: React.FormEvent<HTMLInputElement>): void {
    if (e.currentTarget.value.trim()) {
      props.setTitle(e.currentTarget.value);
    } else {
      props.setTitle('');
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (props.title.trim()) {
      dispatch(
        changeCardTitleActionCreator({ cardId: props.id, title: props.title }),
      );
      props.setTitle(props.title);
    }
    if (props.text.trim()) {
      dispatch(
        changeCardTextActionCreator({ cardId: props.id, text: props.text }),
      );
      props.setText(props.text);
    }
    props.setCardChange();
  }

  function onTextValueChange(e: React.FormEvent<HTMLTextAreaElement>): void {
    if (e.currentTarget.value.trim()) {
      props.setText(e.currentTarget.value);
    } else {
      props.setText('');
    }
  }

  return (
    <>
      <div className="show-card__header-wrapper">
        <form onSubmit={onSubmit} className="show-card__change-header-form">
          <input
            value={props.title}
            onChange={onTitleValueChange}
            className="show-card__change-header-inp"
          />
          <textarea
            onChange={onTextValueChange}
            className="show-card__change-text-inp"
            value={props.text}
          />
          <button type="submit" className="show-card__change-header-btn">
            OK
          </button>
        </form>
      </div>
    </>
  );
}

export default CardEditForm;
