import { login as loginApi } from "@utils/api";
import { openNotification } from "@utils/helpers";

export const LOGIN_IN_PROGRESS = "AUTH::LOGIN_IN_PROGRESS";
export const LOGIN_FAILED = "AUTH::LOGIN_FAILED";
export const LOGIN_SUCCESS = "AUTH::LOGIN_SUCCESS";

export const LOGIN_POPUP_OPEN = "AUTH::LOGIN_POPUP_OPEN";
export const LOGIN_POPUP_CLOSE = "AUTH::LOGIN_POPUP_CLOSE";

export const LOGOUT = "AUTH::LOGOUT";

export function loginSuccess(token) {
  openNotification({
    title: "Вход",
    text: "Вход успешно выполнен",
    type: "success",
  });
  localStorage.setItem("user_auth_token", token);
  return { type: LOGIN_SUCCESS, token };
}

export function loginFailed() {
  openNotification({
    title: "Вход",
    text: "Учётные данные не найдены",
    type: "error",
  });
  return { type: LOGIN_FAILED };
}


export function openLoginPopup() {
  return { type: LOGIN_POPUP_OPEN };
}

export function closeLoginPopup() {
  return { type: LOGIN_POPUP_CLOSE };
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
   
  localStorage.removeItem("user_auth_token");
  return { type: LOGOUT };
}

// export const AUTH_SET_DATA = "AUTH::AUTH_SET_DATA";
// export const USER_SET_IS_AUTH = "AUTH::USER_SET_IS_AUTH";
// export const LOGOUT = "AUTH::LOGOUT";

// export const setUserData = (data) => ({
//   type: AUTH_SET_DATA,
//   payload: data,
// });

// export const userSetIsAuth = (bool) => ({
//   type: USER_SET_IS_AUTH,
//   payload: bool,
// });

// export const logout = () => (bool) => ({
//   type: LOGOUT,
//   payload: bool,
//   //   window.localStorage.removeItem("time");
//   //   window.localStorage.removeItem("token");
//   //   dispatch(setLogOut());
// });

// export const fetchUserData = () => (dispatch) => {
//   dispatch(setUserData('admin', 123));
// };

// export const fetchUserLogin =
//   ({ username, password }) =>
//   (dispatch) => {
//     return loginApi(username, password)
//       .then(({ data }) => {
//         const { status, token } = data;
//         openNotification({
//           title: "Отлично!",
//           text: "Авторизация успешна.",
//           type: "success",
//         });
//         window.localStorage.setItem("user_auth_token", token);
//         window.localStorage.setItem(
//           "tokenTime",
//           String(new Date().getTime() + 60 * 60 * 24 * 1000)
//         );
//         dispatch(fetchUserData(data));
//         dispatch(userSetIsAuth(true));
//         return data;
//       })
//       .catch(({ response }) => {
//         openNotification({
//           title: "Ошибка при авторизации",
//           text: "Неверный логин или пароль",
//           type: "error",
//         });
//       });
//   };

// window.token = token

// const handleSignIn = async () => {
//   try {
//     const url =
//       "https://uxcandy.com/~shapoval/test-task-backend/v2/login/?developer=Diana";
//     const form = new FormData();
//     form.append("username", login);
//     form.append("password", pass);

//     let response = await fetch(url, {
//       method: "POST",
//       body: form,
//     });
//     console.log(response);
//     let result = await response.json();
//     console.log("message", result.message);

//     for (let key in result.message) {
//       setMessage(key + ": " + result.message[key]);
//     }
//     setStatus(response.status);
//     switch (response.status) {
//       case "ok":
//         setVariant("success");
//         setMessage(message, "Вы авторизованны");

//         localStorage.setItem("username", login);
//         localStorage.setItem("token", response.message.token);
//         localStorage.setItem("tokenTime", Date.now() + 36 * 24 * 100000);
//         setTimeout(() => window.location.assign("/"), 1000);
//         break;
//       case "error":
//         setVariant("danger");
//         setMessage(message, message);
//         break;
//       default:
//     }
//   } catch (e) {
//     setError("message", e.message);
//   }
// };
