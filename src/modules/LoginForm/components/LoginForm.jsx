import React, { useState } from "react";
import { Link } from "react-router-dom";

import { Form, Input } from "antd";
import { Button } from "@components";

import closeSvg from "@assets/img/close.svg";

import styles from "./LoginForm.scss";

const validate = (key, touched, errors) => {
  if (touched[key]) {
    if (errors[key]) {
      return "error";
    } else {
      return "success";
    }
  } else {
    return "";
  }
};

const LoginForm = (props) => {
  const {
    values,
    touched,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    isValid,
    isSubmitting,
  } = props;

  return (
    <div>
      <div className="modal__over">
        <div className="modal__content">
          <div className="auth__top">
            <Link to={"/"}>
              <img src={closeSvg} alt="Close icon" />
            </Link>
            <h2>Авторизация</h2>
          </div>
          <Form onSubmit={handleSubmit} className="login-form">
            <Form.Item
              validateStatus={validate("login", touched, errors)}
              help={!touched.login ? "" : errors.login}
              hasFeedback
            >
              <Input
                id="login"
                size="large"
                placeholder="Логин"
                value={values.login}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item
              validateStatus={validate("password", touched, errors)}
              help={!touched.password ? "" : errors.password}
              hasFeedback
            >
              <Input
                id="password"
                size="large"
                type="password"
                placeholder="Пароль"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </Form.Item>
            <Form.Item>
              {isSubmitting && !isValid && <span>Ошибка!</span>}
              <Button type="submit" size="large">
                Войти в аккаунт
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;

// const [login, setLogin] = useState("");
// const [password, setPassword] = useState("");
// const [error, setError] = useState("");
// const [message, setMessage] = useState("");
// const [status, setStatus] = useState("false");
// const [variant, setVariant] = useState("false");

// const selectToLoginPass = (state) => {
//   return {
//     login: state.auth.login,
//     password: state.auth.password,
//   };
// };

// const handleChangeLogin = (e) => {
//   setLogin(e.target.value);
// };
// const handleChangePassword = (e) => {
//   setPass(e.target.value);
// };

// const handleSignUp = async () => {
//   try {
//     console.log(login, pass);
//     // await signUp(login, pass);
//   } catch (e) {
//     setError(e.message);
//   }
// };

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

// const handleSubmit = (e) => {
//   e.preventDefault();

//   handleSignIn(e);

//   // if (isSignUp) {
//   //   handleSignUp();
//   //   console.log(1);
//   // } else {
//   //   handleSignIn();
//   //   console.log(2);
//   // }

//   setLogin("");
//   setPass("");
// };

// return (
//   <>
//     <Formik
//     initialValues={{
//       login: '',
//       password: ''
//     }}
//     >
//       {(formik) => {
//         <Form>
//           <Box
//             sx={{
//               width: 500,
//               padding: 5,
//               bgcolor: "background.paper",
//               borderRadius: "12px",
//               boxShadow: 1,
//               fontWeight: "bold",
//               display: "flex",
//               justifyContent: "center",
//             }}
//           >
//             <Box
//               component="span"
//               sx={{
//                 fontSize: 16,
//               }}
//             >
//               <Typography variant="h4" gutterBottom component="div">
//                 {isSignUp ? "SignUp" : "Login"}
//               </Typography>

//               <NavLink to={`${isSignUp ? "/" : "/signup"}`}>
//                 {!isSignUp ? "SignUp" : "Login"}
//               </NavLink>

//               <form
//                 id="formElem"
//                 className="home__form"
//                 onSubmit={handleSubmit}
//               >
//                 <TextField
//                   className="child__text-field"
//                   id="outlined-basic"
//                   label="login"
//                   placeholder="Введите логин"
//                   variant="outlined"
//                   value={login}
//                   type="text"
//                   onChange={handleChangeLogin}
//                 />
//                 <TextField
//                   className="child__text-field"
//                   variant="outlined"
//                   label="Password"
//                   placeholder="Введите пароль"
//                   value={pass}
//                   type="password"
//                   onChange={handleChangePass}
//                 />
//                 <NavLink to="/">
//                   <Button
//                     type="submit"
//                     variant="outlined"
//                     onClick={handleSubmit}
//                   >
//                     Войти
//                   </Button>
//                 </NavLink>

//                 {error && <span>{error}</span>}
//               </form>
//             </Box>
//           </Box>
//         </Form>;
//       }}
//     </Formik>
//   </>
// );
