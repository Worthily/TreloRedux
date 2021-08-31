import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUserActionCreator } from '../../store';

function LoginPopup() {
  const dispatch = useDispatch();
  const [user, setUser] = useState('');

  function onValueChange(e: React.FormEvent<HTMLInputElement>): void {
    setUser(e.currentTarget.value);
  }

  const onSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (user !== '') {
      dispatch(setUserActionCreator({ userName: user }));
      setUser('');
    }
  };

  return (
    <div className="login-popup">
      <div className="login-popup__wrapper">
        <p className="login-popup__header">Введите имя пользователя</p>
        <form className="login-popup__form" onSubmit={onSubmit}>
          <input
            className="login-popup__input"
            onChange={onValueChange}
            type="text"
            name="userNameInput"
          />
          <button className="login-popup__btn">OK</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPopup;
