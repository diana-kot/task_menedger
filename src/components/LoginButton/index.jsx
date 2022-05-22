import React from "react";
import { Button } from "antd";

import { useSelector, useDispatch } from "react-redux";
import { logout, openLoginPopup } from "@store/Auth/actions";

import { authSelector } from "@store/Auth/selector";

const LoginButton = ({ toggleFormVisible }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(authSelector);

  if (isAuth) {
    return (
      <Button onClick={() => dispatch(logout())} type="primary">
        Выйти из аккаунта
      </Button>
    );
  }

  return (
    <Button type="primary" onClick={toggleFormVisible}>
      Войти
    </Button>
  );
};

export default LoginButton;
