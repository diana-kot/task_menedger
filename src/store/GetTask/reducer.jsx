import {
  TASK_LOADING_IN_PROGRESS,
  TASK_LOADING_FAILURE,
  TASK_LOADING_SUCCESS,
  CHANGE_SORT,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_FAILURE,
  TASKS_CHANGE_PAGE,
  TASKS_CHANGE_TOTAL_TASK_COUNT,
} from "./actions";

export const taskState = {
  tasks: [],
  isTasksLoading: false,
  isTasksLoadingFailed: false,
  tasksCount: 0,
  page: 1,
  isAddTaskPopupOpen: false,
  sortField: "id",
  sortDirection: "asc",
};

export const tasksReducer = (state = taskState, action) => {
  switch (action.type) {
    case CHANGE_SORT: {
      return {
        ...state,
        sortField: action.payload.sortField,
        sortDirection: action.payload.sortDirection,
        
      };
    }
    case TASKS_CHANGE_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case TASKS_CHANGE_TOTAL_TASK_COUNT:
      return {
        ...state,
        total_task_count: action.payload,
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        tasks: state.tasks.map((task) =>
          task.id === action.payload.taskId
            ? {
                id: action.payload.taskId,
                email: task.email,
                username: task.username,
                text: action.payload.text,
                status: action.payload.status,
              }
            : task
        ),
      };
    case TASK_LOADING_FAILURE:
      return {
        ...state,
        isTasksLoading: false,
        isTasksLoadingFailed: true,
      };
    case TASK_LOADING_IN_PROGRESS:
      return {
        ...state,
        isTasksLoading: true,
        isTasksLoadingFailed: false,
      };
    case TASK_LOADING_SUCCESS:
      return {
        ...state,
        isTasksLoading: false,
        isTasksLoadingFailed: false,
        tasks: action.payload.tasks,
        tasksCount: parseInt(action.payload.total_task_count),
        page: action.page,
      };
    default:
      return state;
  }
};
