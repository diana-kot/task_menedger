import {
  LOGIN_IN_PROGRESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
} from "./actions";

export const userState = {
  isAuth: !!window.localStorage.getItem("auth_token"),
  isLoginInProgress: false,
  token: window.localStorage.getItem("auth_token") || null,
};

export const authReducer = (state = userState, { type, payload }) => {
  switch (type) {
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        token: null,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuth: true,
        isLoginInProgress: false,
       
      };
    case LOGIN_FAILED:
      return {
        ...state,
        isLoginInProgress: false,
      };
    case LOGIN_IN_PROGRESS:
      return {
        ...state,
        isLoginInProgress: true,
      };
    default:
      return state;
  }
};
