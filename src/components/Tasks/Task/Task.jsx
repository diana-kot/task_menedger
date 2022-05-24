import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { authSelector } from "@store/Auth/selector";
import { taskSelector } from "@store/GetTask/selector";
import { Checkbox, Input } from "antd";

import { editTask } from "@store/GetTask/actions";

import "./Task.scss";

const convertStatusToText = (statusCode) => {
  switch (statusCode) {
    case 0:
      return "Задача не выполнена";
    case 10:
      return "Задача выполнена";
    default:
      return "Неизвестно";
  }
};

// case 1:
//       return "Задача не выполнена, отредактирована админом";
// case 11:
//       return "Задача отредактирована админом и выполнена";

const Task = ({ task }) => {
  const dispatch = useDispatch();
  const { isAuth } = useSelector(authSelector);

  // const status = useSelector(state => state.tasks.tasks.find((s)=> s.id === 0).status);

  const [text, setText] = useState(task.text);
  const [checkboxStatus, setСheckboxStatus] = useState("Задача не выполнена");

  const handleBlur = () => {
    dispatch(editTask(task.id, text, undefined));
  };

  const renderText = () => {
    if (!isAuth) {
      return task.text;
    }
    return (
      <Input
        placeholder="Изменить текст..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        onBlur={handleBlur}
      />
    );
  };

  const onChangeCheckbox = (e) => {
    const newStatus = e.target.checked ? 10 : 0;
    task.status = newStatus;
    setСheckboxStatus('Задача выполнена')
    dispatch(editTask(task.id, undefined, newStatus));
  };

  const rendeCheckboxForAdmin = () => {
    if (isAuth) {
      return (
        <input
          className="checkbox"
          type="checkbox"
          checked={task.status === 10}
          onChange={onChangeCheckbox}
        />

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
