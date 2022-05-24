import { useSelector } from "react-redux";
import CreateTask from "../../modules/CreateTask/CreateTask";
import Login from "../../modules/Login/Login";

import { closeLoginPopup } from "../../store/Auth/actions";
import styles from "./Header.scss";

const Header = () => {
  const isLoginPopupOpen = useSelector((state) => state.tasksReducer);

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
