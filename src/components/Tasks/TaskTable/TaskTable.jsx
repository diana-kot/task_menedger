import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { Spin, Space } from "antd";

import { taskSelector } from "@store/GetTask/selector";
import { loadTasks, changeSort, setTasksPage } from "@store/GetTask/actions";
import SortTask from "../SortTask";
import TaskNavigation from "../TaskNavigation";
import Task from "../Task";

import "./TaskTable.scss";

const TaskTable = () => {
  const dispatch = useDispatch();

  const tasks = useSelector(taskSelector);
  const { tasksCount, page, isTasksLoading, sortField, sortDirection } =
    useSelector(({ tasks }) => tasks);

  const pagesCount = tasksCount;
  const sortFieldTask = sortField
  const sortDirectionTask = sortDirection

  
  const [activePage, setActivePage] = useState(page);

  const handleHeaderClick = (headerKey) => {
    return () => {
    
     if (sortFieldTask === headerKey) {
      dispatch(
        changeSort(headerKey, sortDirectionTask === "asc" ? "desc" : "asc")
      );
    } else {
      dispatch(changeSort(headerKey, "desc"));
    }
    };
  };

  const getSortDirection = (headerKey) => {
    return sortFieldTask === headerKey ? sortDirectionTask : null;
  };

  const onchangePage = (pageNamber) => {
    if (1 <= pageNamber && pageNamber <= Math.ceil(pagesCount / 3)) {
      setActivePage(pageNamber);
      dispatch(setTasksPage(pageNamber));
      dispatch(loadTasks(pageNamber));
    }
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
              onClick={handleHeaderClick("id")}
              sortDirection={getSortDirection("id")}
              style={{ width: "15%" }}
            >
              id
            </SortTask>
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
            <tr style={{ width: "100%" }}>
              <td colSpan="4" className="loader">
                <Space size="middle">
                  <Spin size="large" />
                </Space>
              </td>
            </tr>
          ) : (
            <>
              {tasks.map((task) => (
                <Task key={task.id} task={task} />
              ))}
            </>
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
