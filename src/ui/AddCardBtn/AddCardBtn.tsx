import React from 'react';

function AddCardBtn(props: { createCard(): void }) {
  const { createCard } = props;

  return (
    <div onClick={createCard} className="column__add-card-btn">
      Добавить новую карточку...
    </div>
  );
}

export default AddCardBtn;
