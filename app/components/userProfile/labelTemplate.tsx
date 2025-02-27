"use client";

import React from "react";
import { FormTypes } from "devextreme-react/cjs/form";

export default function LabelTemplate(iconName: string) {
  return function template(data: FormTypes.SimpleItemLabelTemplateData) {
    return (
      <div>
        <i className={`dx-icon dx-icon-${iconName}`}></i>
        {data.dataField === "id" ? "Employee ID:" : data.text}
      </div>
    );
  };
}
