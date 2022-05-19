import React, { useState } from "react";
import "./TaskNavigation.scss";

const TaskNavigation = ({ currentPage, pagesCount, changePage }) => {
  const pages = [];

  for (let pageNumber = 1; pageNumber <= Math.ceil(pagesCount / currentPage); pageNumber++) {
    if (pageNumber === currentPage) {
      pages.push(
        <li
          key={pageNumber}
          style={{ backgroundColor: "red" }}
          onClick={() => changePage(pageNumber)}
          disabled={pageNumber>pagesCount || pageNumber<=0}
        >
          {pageNumber}
        </li>
      );
    } else
      pages.push(
        <li key={pageNumber} onClick={() => changePage(pageNumber)}>
          {pageNumber}
        </li>
      );
  }

  return (
    <div>
      <ul className="padination">{pages}</ul>
    </div>
  );
};

export default TaskNavigation;
