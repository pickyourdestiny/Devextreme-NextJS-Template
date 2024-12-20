"use client";

import React from "react";

export default function LabelTemplate(iconName) {
  return function template(data) {
    return (
      <div>
        <i className={`dx-icon dx-icon-${iconName}`}></i>
        {data.dataField === "id" ? "Employee ID:" : data.text}
      </div>
    );
  };
}
