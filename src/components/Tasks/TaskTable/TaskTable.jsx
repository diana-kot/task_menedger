import React, { useState } from "react";

import { Spin, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

import { getsTasksload, changeSort } from "@store/GetTask/actions";

import SortTask from "../SortTask";
import TaskNavigation from "../TaskNavigation";
import Task from "../Task";

import "./TaskTable.scss";

const TaskTable = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => state.tasks);

  const pagesCount = Math.ceil(tasks.tasksCount / 3);
  const { isTasksLoading } = tasks;

  const changePage = (pageNumber) => {
    dispatch(getsTasksload(pageNumber));
  };

  const handleHeaderClick = (headerKey) => {
    return () => {
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
    return tasks.sortField === headerKey ? tasks.sortDirection : null;
  };

  const nextPage = () => tasks.page((prev) => prev + 1);
  const prevPage = () => tasks.page((prev) => prev - 1);

  return (
    <>
      {isTasksLoading ? (
        <div className="loader">
          <Space size="middle">
            <Spin size="large" />
          </Space>
        </div>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <SortTask
                  onClick={handleHeaderClick("username")}
                  sortDirection={getSortDirection("username")}
                  style={{ width: "30%" }}
                >
                  Имя пользователя
                </SortTask>
                <SortTask
                  onClick={handleHeaderClick("email")}
                  sortDirection={getSortDirection("email")}
                  style={{ width: "25%" }}
                >
                  E-mail
                </SortTask>
                <th style={{ width: "40%" }}>Текст задачи</th>
                <SortTask
                  onClick={handleHeaderClick("status")}
                  sortDirection={getSortDirection("status")}
                  style={{ width: "15%" }}
                >
                  Статус
                </SortTask>
              </tr>
            </thead>
            <tbody>
              {tasks.tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </tbody>
          </table>

          <TaskNavigation
            pagesCount={pagesCount}
            currentPage={tasks.page}
            changePage={changePage}
          />
          <button className="btn btn-primary" onClick={prevPage}>
            <LeftCircleOutlined />
          </button>
          <button className="btn btn-primary" onClick={nextPage}>
            <RightCircleOutlined />
          </button>
        </>
      )}
    </>
  );
};

export default TaskTable;

//   const [currentPage, setCurrentPage] = useState(1);
//   const [tasksPerPage] = useState(3);

//   const lastTaskIndex = currentPage * tasksPerPage;
//   const firstTaskIndex = lastTaskIndex - tasksPerPage;
//   const currentTask = tasks.slice(firstTaskIndex, lastTaskIndex);
