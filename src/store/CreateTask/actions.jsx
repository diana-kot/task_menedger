export const CREATE_TASK = "TASK::CREATE_TASK";
export const TASK_CHANGE_ID = "TASK::CHANGE_ID";
export const TASK_CHANGE_USERNAME = "TASK::CHANGE_USERNAME";
export const TASK_CHANGE_EMAIL = "TASK::CHANGE_EMAIL";
export const TASK_CHANGE_TEXT = "TASK::CHANGE_TEXT";
export const TASK_CHANGE_STATUS = "TASK::CHANGE_STATUS";

export const createTask = (id, username,  email, text, status) => ({
  type: CREATE_TASK,
  id: id,
  username: username,
  email: email,
  text: text,
  status: status,
});

export const setTaskId = (id) => ({
  type: TASK_CHANGE_ID,
  payload: id,
});

export const setTaskUserName = (username) => ({
  type: TASK_CHANGE_USERNAME,
  payload: username,
});
export const setTaskEmail = (email) => ({
  type: TASK_CHANGE_EMAIL,
  payload: email,
});
export const setTaskText = (text) => ({
  type: TASK_CHANGE_TEXT,
  payload: text,
});
export const setTaskStatus = (status) => ({
  type: TASK_CHANGE_STATUS,
  payload: status,
});
