import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";
import { Button } from "@components";

import styles from "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="wrapper">
        <div className="header__wrapper">
          <nav className="header__nav">
            <ul className="header__list">
              <li className="header__item">
                <NavLink className="header__link" to="/">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink className="header__link" to="/auth">
                  <Button>Admin</Button>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  text: PropTypes.string,
};

export default Header;
