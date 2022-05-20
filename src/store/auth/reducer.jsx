import { AUTH_SET_DATA, USER_SET_IS_AUTH } from "./actions";

const userState = {
  data: null,
  token: localStorage.getItem("user_auth_token") || null,
  isAuth: !!localStorage.getItem("user_auth_token"),
};

export const authReducer = (state = userState, { type, payload }) => {
  switch (type) {
    case AUTH_SET_DATA:
      return {
        ...state,
        data: payload,
        isAuth: true,
        token: localStorage.getItem("user_auth_token"),
      };
    case USER_SET_IS_AUTH:
      return {
        ...state,
        isAuth: payload,
      };

    default:
      return state;
  }
};
