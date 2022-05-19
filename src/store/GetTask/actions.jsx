import { getTasks, editTask as editTaskApi } from "@utils/api/index";

export const GET_TASK_REQUEST = "TASK::GET_TASK_REQUEST";
export const GET_TASK_SUCCESS = "TASK::GET_TASK_SUCCESS";
export const GET_TASK_FAILURE = "TASK::GET_TASK_FAILURE";

export const CHANGE_SORT = "TASK::CHANGE_SORT";

export const EDIT_TASK_SUCCESS = "TASK::EDIT_TASK_SUCCESS";
export const EDIT_TASK_FAILURE = "TASK::EDIT_TASK_FAILURE";

export const getTaskRequest = () => ({
  type: GET_TASK_REQUEST,
});

export const getTaskSuccess = (asksObject, page) => ({
  type: GET_TASK_SUCCESS,
  asksObject,
  page,
});

export const getTaskFailure = (error) => ({
  type: GET_TASK_FAILURE,
  //   payload: error,
});

export const getsTasksload = () => (dispatch, getState, page) => {
  dispatch(getTaskRequest());
  const usedPage = page || getState().tasks.page;

  getTasks(usedPage, getState().tasks.sortField, getState().tasks.sortDirection)
    .then((tasks) => {
      dispatch(getTaskSuccess(tasks, usedPage));
    })

    .catch((err) => {
      dispatch(getTaskFailure(err));
      console.warn(err);
    });
};

//редактирование задачи
export const editTaskSuccess = (taskId, text, status) => ({
  type: EDIT_TASK_SUCCESS,
  taskId,
  text,
  status,
});

export const editTaskFailure = (dispatch, errResult) => {
  // dispatch(logout(false));
  return { type: EDIT_TASK_FAILURE };
};

export function editTask(id, text, status) {
  return (dispatch, getState) => {
    let usedStatus = status;
    let usedText = text;

    if (!status && status !== 0) {
      usedStatus = getState().tasks.tasks.find((x) => x.id === id).status;
    }
    if (!text) {
      usedText = getState().tasks.tasks.find((x) => x.id === id).text;
    }

    editTaskApi(getState().user.token, id, usedText, usedStatus)
      .then((result) => {
        dispatch(editTaskSuccess(result, id, usedText, usedStatus));
      })
      .catch((errResult) => {
        dispatch(editTaskFailure(dispatch, errResult.payload));
      });
  };
}

//сортировка
// export const changeSort = (sortField, sortDirection) => {
//   return (dispatch, getState) => {
//     dispatch({
//       type: CHANGE_SORT,
//       sortField,
//       sortDirection,
//     }),
//       dispatch(getsTasksload(getState().tasks.page));
//   };
// };

export const changeSort = (sortField, sortDirection) => ({
  type: CHANGE_SORT,
  sortField,
  sortDirection,
});
