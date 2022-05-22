import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { taskSelector } from "@store/GetTask/selector";
import { Spin, Space, List } from "antd";
import { useSelector, useDispatch } from "react-redux";

import {
  FileExcelOutlined,
  LeftCircleOutlined,
  RightCircleOutlined,
} from "@ant-design/icons";

import { loadTasks, changeSort } from "@store/GetTask/actions";

import SortTask from "../SortTask";
import TaskNavigation from "../TaskNavigation";
import Task from "../Task";

import "./TaskTable.scss";

const TaskTable = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(taskSelector);

  const {
    tasksCount,
    page,
    isTasksLoading,
    isTasksLoadingFailed,
    sortField,
    sortDirection,
  } = useSelector(({ tasks }) => tasks);

  const pagesCount = Math.ceil(tasksCount / 3);

  const handleHeaderClick = (headerKey) => {
    return () => {
       console.log(sortField)
      if (tasks.sortField === headerKey) {
        dispatch(
          changeSort(headerKey, tasks.sortDirection === "asc" ? "desc" : "asc")
        );
      } else {
        dispatch(changeSort(headerKey, "desc"));
      }
    };
  };

  const getSortDirection = (headerKey) => {
    // console.log(sortDirection)
    return tasks.sortField === headerKey ? tasks.sortDirection : null;
  };

  const changePage = (pageNumber) => {
    dispatch(loadTasks(pageNumber));
  };

  const nextPage = () => page((prev) => prev + 1);
  const prevPage = () => page((prev) => prev - 1);

  React.useEffect(() => {
    dispatch(loadTasks(sortField, sortField));
  }, [sortField, sortDirection]);

  // const onAddTask = (taskObj) => {
  //   const newList = tasks.map((task) => {
  //     task.tasks = [...task.tasks, taskObj];
  //     return task;
  //   });
  //   loadTasks(newList);
  // };

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <SortTask
              onClick={handleHeaderClick("username")}
              sortDirection={getSortDirection("username")}
              style={{ width: "15%" }}
            >
              Имя пользователя
            </SortTask>
            <SortTask
              onClick={handleHeaderClick("email")}
              sortDirection={getSortDirection("email")}
              style={{ width: "15%" }}
            >
              E-mail
            </SortTask>
            <th style={{ width: "35%" }}>Текст задачи</th>

            <SortTask
              className="table__task-status"
              onClick={handleHeaderClick("status")}
              sortDirection={getSortDirection("status")}
              style={{ width: "25%" }}
            >
              Статус
            </SortTask>
          </tr>
        </thead>

        <tbody>
          {isTasksLoading ? (
            <tr className="loader">
              <td>
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </td>
            </tr>
          ) : (
            tasks.map((task) => <Task key={task.id} task={task} />)
          )}
        </tbody>
      </table>

      <TaskNavigation
        pagesCount={pagesCount}
        currentPage={page}
        changePage={changePage}
      />

      <button className="btn btn-primary" onClick={prevPage}>
        <LeftCircleOutlined />
      </button>
      <button className="btn btn-primary" onClick={nextPage}>
        <RightCircleOutlined />
      </button>
    </>
  );
};

export default styled(TaskTable)`
  with: 100%;
`;

//   const [currentPage, setCurrentPage] = useState(1);
//   const [tasksPerPage] = useState(3);

//   const lastTaskIndex = currentPage * tasksPerPage;
//   const firstTaskIndex = lastTaskIndex - tasksPerPage;
//   const currentTask = tasks.slice(firstTaskIndex, lastTaskIndex);
