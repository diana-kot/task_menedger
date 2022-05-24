import React from "react";

import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons";

import "./SortTask.scss";

const SortTask = ({ children, className, onClick, sortDirection, style }) => {
  return (
    <th onClick={onClick} style={style}>
      {children}
      
      {sortDirection === "desc" && <CaretDownOutlined />}
      {sortDirection === "asc" && <CaretUpOutlined />}
    </th>
  );
};

export default SortTask;
