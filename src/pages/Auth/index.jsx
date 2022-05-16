import PropTypes from "prop-types";

import { LoginForm } from "@components";
import styles from "./Auth.scss";

const Auth = () => {
  return (
    <section className="auth">
      <div className="auth__content">
        <LoginForm />
      </div>
    </section>
  );
};

Auth.propTypes = {
  text: PropTypes.string,
};

export default Auth;
