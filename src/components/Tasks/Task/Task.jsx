import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Checkbox, Input } from "antd";

import { editTask } from "@store/GetTask/actions";

import "./Task.scss";

const convertStatusToText = (statusCode) => {
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
      return "Неизвестно";
  }
};

const Task = ({ task }) => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const [text, setText] = useState(task.text);

  const renderText = () => {
    if (!user.isLoggedIn) {
      return task.text;
    }
    return (
      <Input
        placeholder="Edit report..."
        value={text}
        onChange={setText}
        onConfirm={() => dispatch(editTask(task.id, text))}
      />
    );
  };

  const onChangeCheckbox = (e) => {
    const newStatus = e.target.checked ? 11 : 0;
    dispatch(editTask(task.id, undefined, newStatus));
  };

  const rendeCheckboxForAdmin = () => {
    if (user.isLoggedIn) {
      return (
        <Checkbox checked={task.status === 10} onChange={onChangeCheckbox} />
      );
    }
    return null;
  };

  return (
    <tr>
      <td>{task.username}</td>
      <td>{task.email}</td>
      <td>{renderText()}</td>
      <td>
        {rendeCheckboxForAdmin()}
        {convertStatusToText(task.status)}
      </td>
    </tr>
  );
};

export default Task;
