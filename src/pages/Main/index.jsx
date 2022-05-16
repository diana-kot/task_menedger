import PropTypes from "prop-types";

import { Head } from "@components";
// import styles from "./Main.module.scss";

const Main = () => {
  return (
    <div className="container">
      <Head />
    </div>
  );
};

Main.propTypes = {
  text: PropTypes.string,
};

export default Main;
