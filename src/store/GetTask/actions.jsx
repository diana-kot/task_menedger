import { getTasks, editTask as editTaskApi } from "@utils/api/index";
import { openNotification } from "@utils/helpers";

import axios from "axios";

import { logout } from "../Auth/actions";

export const TASK_LOADING_IN_PROGRESS = "TASK_LOADING_IN_PROGRESS";
export const TASK_LOADING_FAILURE = "TASK_LOADING_FAILURE";
export const TASK_LOADING_SUCCESS = "TASK_LOADING_SUCCESS";

export const TASKS_CHANGE_PAGE = "TASKS_CHANGE_PAGE";
export const TASKS_CHANGE_TOTAL_TASK_COUNT = "TASKS_CHANGE_TOTAL_TASK_COUNT";

export const CHANGE_SORT = "CHANGE_SORT";

export const EDIT_TASK_SUCCESS = "EDIT_TASK_SUCCESS";
export const EDIT_TASK_FAILURE = "EDIT_TASK_FAILURE";

export const setTasksPage = (page) => ({
  type: TASKS_CHANGE_PAGE,
  payload: page,
});

export const setTasksTotalTaskCount = (total_task_count) => ({
  type: TASKS_CHANGE_TOTAL_TASK_COUNT,
  payload: total_task_count,
});

export const loadTasksFailure = (error) => ({
  type: TASK_LOADING_FAILURE,
  payload: error,
});

export const loadTasksSuccess = (tasks, page) => ({
  type: TASK_LOADING_SUCCESS,
  payload: tasks,
  page,
});

export const loadTasksInProgress = () => ({
  type: TASK_LOADING_IN_PROGRESS,
});

const getTaskAPI = (sortField, sortDirection, page) => {
  return `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=diana
  &sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`;
};

export const loadTasks = () => async (dispatch, getState) => {
  dispatch(loadTasksInProgress());
  const sortField = getState().tasks.sortField;
  const sortDirection = getState().tasks.sortDirection;
  const page = getState().tasks.page;

  fetch(getTaskAPI(sortField, sortDirection, page)).then((res) => {
    res.json().then((body) => {
      if (body.status !== "ok") {
        dispatch(loadTasksFailure(body.message));
      } else {
        dispatch(loadTasksSuccess(body.message.tasks));
      }
    });
  });

  // try {
  //   axios
  //     .get(
  //       `https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=diana
  // &sort_field=${sortField}&sort_direction=${sortDirection}&page=${page}`
  //     )
  //     .then(({ data }) => {
  //       dispatch(
  //         loadTasksSuccess(
  //           data.message.tasks,
  //         )
  //       );
  //     });
  //   } catch (error) {
  //     dispatch(loadTasksFailure(error));
  //     console.warn(error);
  //   }
};

export const setSorting = (sortField, sortDirection) => ({
  type: CHANGE_SORT,
  payload: { sortField, sortDirection },
});

export const changeSort = (sortField, sortDirection, page) => {
  return (dispatch, getState) => {
    dispatch(setSorting(sortField, sortDirection));
    dispatch(loadTasks(getState().tasks.page));
  };
};

export const editTaskSuccess = (taskId, text, status) => {
  openNotification({
    title: "Задача",
    text: "Задача успешно отредактирована",
    type: "success",
  });
  return { type: EDIT_TASK_SUCCESS, payload: { taskId, text, status } };
};

export const editTaskFailure = (dispatch, errResult) => {
  if (errResult && errResult.message && errResult.message.token) {
    openNotification({
      title: "Задача",
      text: "Пожалуйста, авторизуйтесь.",
      type: "error",
    });
    dispatch(logout(false));
  }
  return { type: EDIT_TASK_FAILURE };
};

export const editTask = (id, text, status) => {
  return (dispatch, getState) => {
    let usedStatus = status;
    let usedText = text;
    let token = window.localStorage.getItem("user_auth_token");

    if (!status && status !== 0) {
      usedStatus = getState().tasks.tasks.find((x) => x.id === id).status;
    }
    if (!text) {
      usedText = getState().tasks.tasks.find((x) => x.id === id).text;
    }

    editTaskApi(token, id, usedText, usedStatus)
      .then((result) => {
        dispatch(editTaskSuccess(result, id, usedText, usedStatus));
        // dispatch(loadTasks());
      })
      .catch((err) => {
        dispatch(editTaskFailure(err));
        console.warn(err);
      });
  };
};
