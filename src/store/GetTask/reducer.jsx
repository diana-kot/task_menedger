import {
  GET_TASK_REQUEST,
  GET_TASK_SUCCESS,
  GET_TASK_FAILURE,
  CHANGE_SORT,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILURE,
} from "./actions";

const initialState = {
  isTasksLoading: false,
  isTasksLoadingFailed: false,
  tasks: [],
  tasksCount: 0,
  page: 1,
  sortField: "id",
  sortDirection: "asc",
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASK_REQUEST: {
      return {
        ...state,
        isTasksLoading: true,
        isTasksLoadingFailed: false,
      };
    }
    case GET_TASK_SUCCESS: {
      return {
        ...state,
        isTasksLoading: false,
        isTasksLoadingFailed: false,
        tasks: action.asksObject.tasks,
        tasksCount: action.tasksObject.total_task_count,
        page: action.page,
      };
    }
    case EDIT_TASK_FAILURE: {
      return {
        ...state,
        isTasksLoading: false,
        isTasksLoadingFailed: true,
      };
    }
    case GET_TASK_FAILURE: {
      return {
        ...state,
        isTasksLoading: false,
        isTasksLoadingFailed: true,
      };
    }
    //сортировка
    case CHANGE_SORT: {
      return {
        ...state,
        sortField: action.sortField,
        sortDirection: action.sortDirection,
      };
    }
    // редактирование
    case EDIT_TASK_SUCCESS: {
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.taskId
            ? {
                id: action.taskId,
                username: task.username,
                email: task.email,
                text: action.text ? action.text : task.text,
                status:
                  action.status || action.status === 0
                    ? action.status
                    : task.status,
              }
            : task
        ),
      };
    }

    default:
      return state;
  }
};
