import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Input } from "antd";

import { authSelector } from "@store/Auth/selector";
import { editTask } from "@store/GetTask/actions";

import "./Task.scss";

const setStatusText = (statusCode) => {
  switch (statusCode) {
    case 0:
      return "Задача не выполнена";
    case 1:
      return "Задача не выполнена, отредактирована админом";
    case 10:
      return "Задача выполнена";
    case 11:
      return "Задача отредактирована админом и выполнена";
    default:
      return "Задача не выполненатно";
  }
};

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(authSelector);

  const [text, setText] = useState(task.text);
  const [checkboxStatus, setСheckboxStatus] = useState(
    setStatusText(task.status)
  );

  const handleBlur = (e) => {
    console.log("value", e.target.value);
    if (e.target.value) {
      console.log("Есть значение");
      dispatch(editTask(task.id, text, undefined));
      setСheckboxStatus(setStatusText(1));
      const newStatus = 1;
      dispatch(editTask(task.id, undefined, newStatus));
    } else {
      console.log("нет значения");
      setText(task.text);
      setСheckboxStatus(setStatusText(0));
      const newStatus = 0;
      dispatch(editTask(task.id, undefined, newStatus));
    }
  };

  const onChangeInputText = (e) => {
    setText(e.target.value);
  };

  const renderText = () => {
    if (!isAuth) {
      return task.text;
    }
    return (
      <Input
        placeholder="Изменить текст..."
        value={text}
        onChange={onChangeInputText}
        onBlur={handleBlur}
      />
    );
  };

  const onChangeCheckbox = (e) => {
    if (text !== task.text) {
      console.log(1);
      const newStatus = e.target.checked ? 11 : 1;
      task.status = newStatus;
      console.log(1, newStatus);
      setСheckboxStatus(setStatusText(newStatus)); // Задача отредактирована админом и выполнена
      dispatch(editTask(task.id, undefined, newStatus));
    } else {
      console.log(2);
      const newStatus = e.target.checked ? 10 : 0;
      task.status = newStatus;
      console.log(2, newStatus);
      setСheckboxStatus(setStatusText(newStatus));
      dispatch(editTask(task.id, undefined, newStatus));
    }
  };

  const rendeCheckboxForAdmin = () => {
    if (isAuth) {
      return (
        <>
          {text === task.text ? (
            <input
              className="checkbox-one"
              type="checkbox"
              checked={task.status === 10}
              onChange={onChangeCheckbox}
            />
          ) : (
            <input
              className="checkbox-two"
              type="checkbox"
              checked={task.status === 11}
              onChange={onChangeCheckbox}
            />
          )}
        </>
      );
    }
    return null;
  };

  return (
    <tr>
      <td>{task.id}</td>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>{renderText()}</td>
      <td>
        {rendeCheckboxForAdmin()}
        {checkboxStatus}
      </td>
    </tr>
  );
};

export default Task;
