export default ({ isAuth, values, errors }) => {
  const rules = {
    email: (value) => {
      if (!value) {
        errors.email = "Введите E-Mail";
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
        errors.email = "Неверный E-Mail";
      }
    },
    login: (value) => {
      if (isAuth && !value) {
        errors.login = "Укажите логин";
      }

      // else if (!/admin/.test(value)) {
      //   errors.password = "Неверный логин";
      // }
    },
    password: (value) => {
      if (!value) {
        errors.password = "Введите пароль";
      }

      // else if (!/(?=.*[0-3])(?=.{3,})/.test(value)) {
      //   errors.password = "Неверный пароль";
      // }
    },
  };

  Object.keys(values).forEach((key) => rules[key] && rules[key](values[key]));
};
