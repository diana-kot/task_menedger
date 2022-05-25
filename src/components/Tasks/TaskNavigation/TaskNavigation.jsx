import React from "react";
import cn from "classnames";
import { Button } from "antd";

import "./TaskNavigation.scss";

const TaskNavigation = ({
  activePage,
  pagesCount,
  changePage,
  currentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(pagesCount / 3); i++) {

    if (i === activePage) {
      pages.push(
        <li
          className="page__item-active"
          key={i}
          onClick={() => changePage(i)}
        >
          {i}
        </li>
      );
    } else
      pages.push(
        <li 
        className="page__item"
        key={i} 
        onClick={() => changePage(i)}>
          {i}
        </li>
      );
  }

  return (
    <>
      <div className="center">
        <ul className="pagination">
          <button
          className="page__item"
            onClick={() => changePage(activePage - 1)}
            disabled={currentPage > pagesCount || currentPage <= 0}
          >
          &lt;
          </button>
          {pages}
          <button
           className="page__item"
            onClick={() => changePage(activePage + 1)}
            disabled={currentPage > pagesCount || currentPage <= 0}
          >
           &gt;
          </button>
        </ul>
      </div>
    </>
  );
};

export default TaskNavigation;
