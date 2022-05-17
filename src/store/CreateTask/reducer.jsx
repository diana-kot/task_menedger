import {
  CREATE_TASK,
  TASK_CHANGE_ID,
  TASK_CHANGE_USERNAME,
  TASK_CHANGE_EMAIL,
  TASK_CHANGE_TEXT,
  TASK_CHANGE_STATUS,
} from "./actions";

const defaultState = {
  id: "",
  username: "",
  email: "",
  text: "",
  status: "",
};

export const taskReducer = (state = defaultState, action) => {
  switch (action.type) {
    case CREATE_TASK:
      return {
        ...state,
        id: action.id,
        username: action.username,
        email: action.payload,
        text: action.payload,
        status: action.payload,
      };

    case TASK_CHANGE_ID:
      return {
        ...state,
        id: action.payload,
      };

    case TASK_CHANGE_USERNAME:
      return {
        ...state,
        username: action.payload,
      };
    case TASK_CHANGE_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case TASK_CHANGE_TEXT:
      return {
        ...state,
        text: action.payload,
      };

    case TASK_CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };

    default:
      return state;
  }
};
