import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "@components";
import CreateTask from "../../modules/CreateTask/CreateTask";

import styles from "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
              <NavLink className="header__link" to="/auth">
                <Button>Войти</Button>
              </NavLink>
            </li>
            <li className="header__item">
              <NavLink className="header__link" to="/">
                Главная
              </NavLink>
            </li>
            <li className="header__item">
              <CreateTask />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

Header.propTypes = {
  text: PropTypes.string,
};

export default Header;
