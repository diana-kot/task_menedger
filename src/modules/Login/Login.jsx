import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Navigate, useNavigate } from "react-router-dom";
import { authSelector } from "@store/Auth/selector";
import { logout, openLoginPopup } from "@store/Auth/actions";
import LoginButton from "../../components/LoginButton";

import { Form, Input } from "antd";
import { Button } from "@components";

import { login } from "@store/Auth/actions";

import closeSvg from "@assets/img/close.svg";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

const Login = () => {
  const { isAuth } = useSelector(authSelector);
  const [form] = Form.useForm();
  // const navigate = useNavigate();
  const [visibleForm, setFormVisible] = useState(false);
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const user = useSelector((state) => state.authReducer);

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
  };

  const handleSubmit = () => {
    dispatch(login(username, password));
    setTimeout(() => {
      if (!isAuth) {
        setFormVisible(false);
      }
    }, 1000);

    // navigate("/", { replace: true });
  };

  return (
    <div>
      {!visibleForm ? (
        <LoginButton toggleFormVisible={toggleFormVisible}></LoginButton>
      ) : (
        <div className="modal__over">
          <div className="modal__content">
            <div className="auth__top">
                <img
                 src={closeSvg} 
                 alt="Close icon"
                 onClick={toggleFormVisible} />
              <h2>Авторизация</h2>
            </div>
            <Form
              {...formItemLayout}
              onFinish={handleSubmit}
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              form={form}
              layout="horizontal"
              name="basic"
              initialValues={{
                residence: ["zhejiang", "hangzhou", "xihu"],
                prefix: "86",
              }}
              scrollToFirstError
              className="login-form"
            >
              <Form.Item
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Поле является обязательным для заполнения",
                    whitespace: true,
                  },
                ]}
              >
                <Input
                  size="large"
                  className="field"
                  placeholder="Логин"
                  value={username}
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    type: "password",
                    message: "Неверный логин или пароль",
                  },
                  {
                    required: true,
                    message: "Поле является обязательным для заполнения",
                  },
                ]}
              >
                <Input
                  size="large"
                  type="password"
                  placeholder="Пароль"
                  className="field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Item>

              <Form.Item {...tailFormItemLayout}>
                <Button
                  //   disabled={isLoading}
                  className="button"
                  htmlType="submit"
                  size="large"
                >
                  Войти в аккаунт
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
