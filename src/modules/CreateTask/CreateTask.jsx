import React, { useState } from "react";
import { Input, Form, Button } from "antd";

import { openNotification } from "@utils/helpers";

import { Block } from "@components";
import { useDispatch } from "react-redux";
import "./CreateTask.scss";

import { loadTasks } from "@store/GetTask/actions";

import { addTask } from "@utils/api";

import addSvg from "../../assets/img/add.svg";

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

const CreateTask = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch();
  const [visibleForm, setFormVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [text, setText] = useState("");

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
  };

  const handleSubmitFormTask = async (values) => {
    try {
      await addTask(username, email, text);
      openNotification({
        title: "Задача",
        text: "Задача успешно добавлена",
        type: "success",
      });
      dispatch(loadTasks());
      setIsLoading(false);
      setFormVisible(false);
      form.resetFields();
    } catch (ex) {
      form.resetFields();
      setIsLoading(false);
      const errMessage = ex.payload.message;
      if (Object.keys(errMessage).length > 0) {
        return Object.keys(errMessage).map((key) =>
          console.log({
            message: errMessage[key],
            timeout: 2000,
          })
        );
      }
      setIsLoading(false);
      openNotification({
        title: "Задача",
        text: "Возникла непредвиденная ошибка",
        type: "error",
      });
    }
    return null;
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addSvg} alt="Add icon" />
          <span>Новая задача</span>
        </div>
      ) : (
        <div className="modal__over">
          <div className="modal__content">
            <div>
              <h5 className="tasks__form-title">Добавление новой задачи</h5>
              <div className="tasks__form-block">
                <Form
                  {...formItemLayout}
                  onFinish={handleSubmitFormTask}
                 
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
                >
                  <div className="tasks__form-input">
                    <Form.Item
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Напишите имя",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        value={username}
                        className="field"
                        type="text"
                        placeholder="Имя пользователя"
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      rules={[
                        {
                          type: "email",
                          message: "Невалидный E-mail",
                        },
                        {
                          required: true,
                          message: "Напишите E-mail",
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        value={email}
                        className="field"
                        type="email"
                        placeholder="e-mail"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </Form.Item>
                    <Form.Item
                      name="text"
                      rules={[
                        {
                          required: true,
                          message: "Напишите текст задачи",
                          whitespace: true,
                        },
                      ]}
                    >
                      <Input
                        size="large"
                        value={text}
                        className="field"
                        type="text"
                        placeholder="Текст задачи"
                        onChange={(e) => setText(e.target.value)}
                      />
                    </Form.Item>
                  </div>
                  <div className="tasks__buttons">
                    <Form.Item {...tailFormItemLayout}>
                      <Button
                        disabled={isLoading}
                        className="button"
                        htmlType="submit"
                      >
                        {isLoading ? "Добавление..." : "Добавить задачу"}
                      </Button>
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                      <Button onClick={toggleFormVisible} className="button">
                        Отмена
                      </Button>
                    </Form.Item>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
