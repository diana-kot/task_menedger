import React from "react";
import CreateTask from "@modules/CreateTask/CreateTask";
import Login from "@modules/Login/Login";

import "./Header.scss";

const Header = () => {
  return (
    <header className="header">
      <div className="header__wrapper">
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
              <Login />
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

export default Header;
