import React from "react";
import cn from "classnames";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";

import "./TaskNavigation.scss";

const TaskNavigation = ({
  activePage,
  pagesCount,
  changePage,
  currentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(pagesCount / 3); i++) {
    if (i === currentPage) {
      pages.push(
        <li
          className={cn({ "page__item-active": activePage === i })}
          key={i}
          onClick={() => changePage(i)}
          disabled={i > pagesCount || i <= 0}
        >
          {i}
        </li>
      );
    } else
      pages.push(
        <li className="page__item" key={i} onClick={() => changePage(i)}>
          {i}
        </li>
      );
  }

  return (
    <>
      <div className="center">
        <ul className="padination">
          <li
            className="btn btn-primary"
            onClick={() => changePage(activePage - 1)}
          >
            <LeftCircleOutlined />
          </li>
          {pages}
          <li
            className="btn btn-primary"
            onClick={() => changePage(activePage + 1)}
          >
            <RightCircleOutlined />
          </li>
        </ul>
      </div>
    </>
  );
};

export default TaskNavigation;
