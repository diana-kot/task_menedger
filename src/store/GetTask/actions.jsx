import { getTasks, editTask as editTaskApi } from "@utils/api/index";
import { openNotification } from "@utils/helpers";

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

export const loadTasksSuccess = (tasks, page, tasksCount) => ({
  type: TASK_LOADING_SUCCESS,
  payload: tasks,
  page,
  tasksCount,
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
        dispatch(loadTasksSuccess(body.message));
      }
    });
  });
};

export const changeSort = (sortField, sortDirection) => {
  return (dispatch, getState) => {
    const page = getState().tasks.page;
    dispatch(setSorting(sortField, sortDirection));
    dispatch(loadTasks(page));
  };
};

export const setSorting = (sortField, sortDirection) => ({
  type: CHANGE_SORT,
  payload: { sortField, sortDirection },
});

export const editTaskSuccess = (taskId, text, status) => {
  // openNotification({
  //   title: "Задача",
  //   text: "Задача успешно отредактирована",
  //   type: "success",
  // });
  return { type: EDIT_TASK_SUCCESS, payload: taskId, text, status };
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
    let newStatus = status;
    let newdText = text;
    let token = window.localStorage.getItem("auth_token");
    let tokenTime = localStorage.getItem("tokenTime");

    if (!status && status !== 0) {
      newStatus = getState().tasks.tasks.find((x) => x.id === id).status;
    }
    if (!text) {
      newdText = getState().tasks.tasks.find((x) => x.id === id).text;
    }

    editTaskApi(token, id, newdText, newStatus)
      .then((result) => {
        dispatch(editTaskSuccess(result, id, newdText, newStatus));
      })
      .catch((err) => {
        localStorage.removeItem('token');
        localStorage.removeItem('tokenTime');
        dispatch(editTaskFailure(err));
        console.warn(err);
      });
  };
};
