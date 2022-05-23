import React, { useState} from "react";
import styled from "styled-components";
import { taskSelector } from "@store/GetTask/selector";
import { Spin, Space } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { loadTasks, changeSort, setTasksPage } from "@store/GetTask/actions";

import SortTask from "../SortTask";
import TaskNavigation from "../TaskNavigation";
import Task from "../Task";

import "./TaskTable.scss";

const TaskTable = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(taskSelector);
  // const tasks = useSelector(state => state.tasks.tasks);
  const { tasksCount, page, isTasksLoading, sortField, sortDirection } =
    useSelector(({ tasks }) => tasks);

  const pagesCount = tasksCount;
  const [activePage, setActivePage] = useState(page);
  const handleHeaderClick = (headerKey) => {
    return () => {
      //  console.log(sortField)
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

  const onchangePage = (pageNamber) => {
    dispatch(setTasksPage(pageNamber));
    dispatch(loadTasks(pageNamber));
    setActivePage(pageNamber);
  };

  React.useEffect(() => {
    dispatch(loadTasks(sortField, sortField));
  }, [sortField, sortDirection]);

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
        changePage={onchangePage}
        activePage={activePage}
      />
    </>
  );
};

export default styled(TaskTable)`
  with: 100%;
`;
