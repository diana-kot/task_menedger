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
  const { isAuth } = useSelector(authSelector);


  // const tasks = useSelector(taskSelector);

  const {
    tasksCount,
    page,
    isTasksLoading,
    isTasksLoadingFailed,
    sortField,
    sortDirection,
  } = useSelector(({ tasks }) => tasks);

   const [text, setText] = useState(task.text);
  
  const handleBlur = () => {
    dispatch(editTask(task.id, text));
  };

  const renderText = () => {
    if (!isAuth) {
      return task.text;
    }
    return (
      <Input
        placeholder="Изменить текст..."
        value={text}
        onChange={(e)=>setText(e.target.value)}
        onBlur={handleBlur}
      />
    );
  };

  const onChangeCheckbox = (e) => {
    const newStatus = e.target.checked ? 11 : 0;
    dispatch(editTask(task.id, newStatus));
  };

  const rendeCheckboxForAdmin = () => {
    if (isAuth) {
      return (
        <Checkbox
          checked={task.status === 0}
          onChange={onChangeCheckbox}
        />
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
