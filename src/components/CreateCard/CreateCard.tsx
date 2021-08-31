import React from 'react';
import { state } from '../../types';
import { useSelector, useDispatch } from 'react-redux';
import {
  createCardActionCreator,
  clearNewCreateCardIdActionCreator,
} from '../../store';
import { Form, Field } from 'react-final-form';

function CreateCard() {
  const dispatch = useDispatch();
  const user = useSelector((state: state) => state.user);
  const columnId = useSelector((state: state) => state.createCardColumnId);

  return (
    <div className="createcard">
      <div className="createcard__wrapper">
        <h2 className="createcard__header">Создание карточки</h2>
        <Form
          onSubmit={(formObj: { title: string; text: string }) => {
            if (formObj.title && formObj.text) {
              if (formObj.title.trim() && formObj.text.trim()) {
                dispatch(
                  createCardActionCreator({
                    title: formObj.title,
                    text: formObj.text,
                    author: user,
                    column: columnId,
                  }),
                );
                dispatch(clearNewCreateCardIdActionCreator());
              }
            }
          }}>
          {({ handleSubmit }) => (
            <form onSubmit={handleSubmit} className="createcard__form">
              <Field name="title">
                {({ input }) => (
                  <input
                    placeholder="Заголовок"
                    type="text"
                    className="createcard__header-input"
                    {...input}
                  />
                )}
              </Field>
              <Field name="text">
                {({ input }) => (
                  <textarea
                    placeholder="Текст карточки"
                    className="createcard__text-input"
                    {...input}></textarea>
                )}
              </Field>
              <button type="submit" className="createcard__btn">
                OK
              </button>
            </form>
          )}
        </Form>
      </div>
    </div>
  );
}

export default CreateCard;
