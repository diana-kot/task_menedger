import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { LoginButton } from "@components";
import CreateTask from "../../modules/CreateTask/CreateTask";
import Login from "../../modules/Login/Login";

import { closeLoginPopup } from "../../store/Auth/actions";
import styles from "./Header.scss";

const Header = () => {

  const isLoginPopupOpen = useSelector(state => state.tasksReducer);

  const dispatch = useDispatch();
  return (
    <header className="header">
      <div className="header__wrapper">
        <nav className="header__nav">
          <ul className="header__list">
            <li className="header__item">
            <Login/>
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



export default Header;
