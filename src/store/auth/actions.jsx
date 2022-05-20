import { login as loginApi } from "@utils/api";
import { openNotification } from "@utils/helpers";

export const AUTH_SET_DATA = "AUTH::AUTH_SET_DATA";
export const USER_SET_IS_AUTH = "AUTH::USER_SET_IS_AUTH";

export const setUserData = (data) => ({
  type: AUTH_SET_DATA,
  payload: data,
});

export const userSetIsAuth = (bool) => ({
  type: USER_SET_IS_AUTH,
  payload: bool,
});

export const fetchUserData = (data) => (dispatch) => {
  loginApi(data)
    .then(({ data }) => {
      dispatch(setUserData(data));
    })
    .catch((err) => {
     
        dispatch(userSetIsAuth(false));
        delete window.localStorage.token;
      
    });
};

export const fetchUserLogin =
  ({ username, password }) =>
  (dispatch) => {
    return loginApi(username, password)
      .then(({ data }) => {
        const { token } = data;
        openNotification({
          title: "Отлично!",
          text: "Авторизация успешна.",
          type: "success",
        });
        window.token = token;
        localStorage.setItem("user_auth_token", token);
        localStorage.setItem("tokenTime", Date.now() + 36 * 24 * 100000);
        dispatch(fetchUserData(data));
        dispatch(userSetIsAuth(true));
        return data;
      })
      .catch(({ response }) => {
        openNotification({
          title: "Ошибка при авторизации",
          text: "Неверный логин или пароль",
          type: "error",
        });
      });
  };





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
