import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import { Form, Input } from "antd";
import { Button } from "@components";

// import { logout } from "@store/Auth/actions";

import closeSvg from "@assets/img/close.svg";

const validate = (key, touched, errors) => {
  if (touched[key]) {
    if (errors[key]) {
      return "error";
    } else {
      return "success";
    }
  } else {
    return "";
  }
};

const LoginForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
  } = props;

  return (
    <div>
      <div className="modal__over">
        <div className="modal__content">
          <div className="auth__top">
            <Link to={"/"}>
              <img src={closeSvg} alt="Close icon" />
            </Link>
            <h2>Авторизация</h2>
          </div>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item
              validateStatus={validate("username", touched, errors)}
              help={!touched.username ? "" : errors.username}
              hasFeedback
            >
              <Input
                id="username"
                size="large"
                placeholder="Имя пользователя"
                value={values.username}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              validateStatus={validate("password", touched, errors)}
              help={!touched.password ? "" : errors.password}
              hasFeedback
            >
              <Input
                id="password"
                size="large"
                type="password"
                placeholder="Пароль"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item>
              {isSubmitting && !isValid && <span>Ошибка!</span>}
              <Button
                disabled={isSubmitting}
                onClick={handleSubmit}
                type="submit"
                size="large">
                Войти в аккаунт
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
