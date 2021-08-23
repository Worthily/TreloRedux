import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setUser } from '../../store/actions';
import { user } from '../../types';

function LoginPopup(props: {
  user: user;
  setUser(user: string): { type: string; value: string };
}) {
  const [user, setUser] = useState(props.user);

  function onValueChange(e: React.FormEvent<HTMLInputElement>): void {
    setUser(e.currentTarget.value);
  }

  function onSubmit(e: React.FormEvent): void {
    e.preventDefault();
    if (user !== '') {
      props.setUser(user);
      setUser('');
    }
  }

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

const mapStateToProps = (state: { user: user }) => {
  return { user: state.user };
};

export default connect(mapStateToProps, { setUser })(LoginPopup);
