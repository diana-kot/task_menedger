import { withFormik } from "formik";

import LoginForm from "../components/LoginForm";

import validateForm from "@utils/validate";

const LoginFormContainer = withFormik({
  enableReinitialize: true,
  mapPropsToValues: () => ({
    login: "",
    password: "",
  }),

  

  validate: (values) => {
    let errors = {};

    validateForm({ isAuth: true, values, errors });

    return errors;
  },

  handleSubmit: (values, { setSubmiting, props }) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2));
      setSubmiting(false);
    }, 1000);
  },
  displayName: "LoginForm",
})(LoginForm);

export default LoginFormContainer;
