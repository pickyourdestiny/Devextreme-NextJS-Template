"use client";

import ScrollView from "devextreme-react/scroll-view";
import "./singleCard.scss";

export default function SingleCard({ title, description, children }) {
  return (
    <ScrollView
      height={"100%"}
      width={"100%"}
      className={"with-footer single-card"}
    >
      <div className={"dx-card content"}>
        <div className={"header flex"}>
          <div className={"title"}>{title}</div>
          <div className={"description"}>{description}</div>
        </div>
        {children}
      </div>
    </ScrollView>
  );
}
