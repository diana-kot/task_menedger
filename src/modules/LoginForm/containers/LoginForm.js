import { withFormik } from "formik";

import LoginForm from "../components/LoginForm";
import { fetchUserLogin } from "@store/Auth/actions";

import store from "@store/store";

import validateForm from "@utils/validate";

const LoginFormContainer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    username: "",
    password: "",
  }),

  validate: (values) => {
    let errors = {};

    validateForm({ isAuth: true, values, errors });

    return errors;
  },

  handleSubmit: (values, { setSubmitting, props }) => {
    store
      .dispatch(fetchUserLogin(values))
      .then(({ status }) => {
        if (status === "success") {
          props.history.push("/");
        
        }
        setSubmitting(false);
      })
      .catch(() => {
        setSubmitting(false);
      });

    // setTimeout(() => {
    //   console.log(JSON.stringify(values, null, 2));
    //   setSubmitting(false);
    // }, 1000);
  },
  displayName: "LoginForm",
})(LoginForm);

export default LoginFormContainer;
