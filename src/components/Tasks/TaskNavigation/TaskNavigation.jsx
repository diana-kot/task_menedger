import React from "react";
import cn from "classnames";
import { LeftCircleOutlined, RightCircleOutlined } from "@ant-design/icons";
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
    if (i === currentPage) {
      pages.push(
        <li
          className={cn({ "page__item-active": activePage === i })}
          key={i}
          onClick={() => changePage(i)}
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
        <ul className="pagination">
          <Button
            type="primary"
            onClick={() => changePage(activePage - 1)}
            disabled={currentPage > pagesCount || currentPage <= 0}
          >
            <LeftCircleOutlined />
          </Button>
          {pages}
          <Button
            onClick={() => changePage(activePage + 1)}
            type="primary"
            disabled={currentPage > pagesCount || currentPage <= 0}
          >
            <RightCircleOutlined />
          </Button>
        </ul>
      </div>
    </>
  );
};

export default TaskNavigation;
