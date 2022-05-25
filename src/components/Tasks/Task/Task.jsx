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
      const newStatus = 1;
      setСheckboxStatus(setStatusText(1));
      dispatch(editTask(task.id, text, newStatus));
    } else {
      console.log("нет значения");
      setText(task.text);
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
      const newStatus = e.target.checked ? 11 : 1;
      task.status = newStatus;
      setСheckboxStatus(setStatusText(newStatus)); // Задача отредактирована админом и выполнена
      dispatch(editTask(task.id, undefined, newStatus));
    } else {
      const newStatus = e.target.checked ? 10 : 0;
      task.status = newStatus;
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
              className="checkbox"
              type="checkbox"
              checked={task.status === 10}
              onChange={onChangeCheckbox}
            />
          ) : (
            <input
              className="checkbox"
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
