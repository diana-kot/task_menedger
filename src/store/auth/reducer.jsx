import {
  LOGIN_IN_PROGRESS,
  LOGIN_FAILED,
  LOGIN_SUCCESS,
  LOGOUT,
  LOGIN_POPUP_OPEN,
  LOGIN_POPUP_CLOSE
} from "./actions";

export const userState = {
  isAuth: !!window.localStorage.getItem("user_auth_token"),
  isLoginInProgress: false,
  token: window.localStorage.getItem("user_auth_token") || null,
  isLoginPopupOpen: false
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
        isLoginPopupOpen: false
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
        case LOGIN_POPUP_OPEN:
        return {
          ...state,
          isLoginPopupOpen: true,
        };
        case LOGIN_POPUP_CLOSE:
        return {
          ...state,
          isLoginPopupOpen: false,
        };
    default:
      return state;
  }
};
