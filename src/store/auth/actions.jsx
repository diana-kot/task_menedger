import { login as loginApi } from "@utils/api";
import { openNotification } from "@utils/helpers";

export const LOGIN_IN_PROGRESS = "AUTH::LOGIN_IN_PROGRESS";
export const LOGIN_FAILED = "AUTH::LOGIN_FAILED";
export const LOGIN_SUCCESS = "AUTH::LOGIN_SUCCESS";

export const LOGOUT = "AUTH::LOGOUT";

export function loginSuccess(token) {
  openNotification({
    title: "Вход",
    text: "Вход успешно выполнен",
    type: "success",
  });
  window.localStorage.setItem("auth_token", token);
  window.localStorage.setItem('tokenTime', Date.now()+36*24*100000);
  return { type: LOGIN_SUCCESS, token };
}

export function loginFailed() {
  let time = Number(window.localStorage.getItem("tokenTime"));
  let now = new Date().getTime();
  if (time < now) {
    window.localStorage.removeItem("auth_token");
    window.localStorage.removeItem("tokenTime");  
  }
  openNotification({
    title: "Вход",
    text: "Учётные данные не найдены",
    type: "error",
  });
  return { type: LOGIN_FAILED };
}

export function loginInProgress(token) {
  return { type: LOGIN_IN_PROGRESS, token };
}

export function login(username, password) {
  return (dispatch) => {
    loginApi(username, password)
      .then((result) => {
        dispatch(loginSuccess(result.token));
      })
      .catch(() => {
        dispatch(loginFailed());
      });
  };
}

export function logout() {
  openNotification({
    title: "Выход",
    text: "Выход из аккаунта успешно выполнен",
    type: "success",
  });
  localStorage.removeItem("auth_token");
  localStorage.removeItem('tokenTime');
  return { type: LOGOUT };
}

