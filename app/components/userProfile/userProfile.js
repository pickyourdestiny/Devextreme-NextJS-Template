"use client";

import React, { useRef, useState, useCallback } from "react";
import "./userProfile.scss";
import { Form, SimpleItem, Label, EmptyItem } from "devextreme-react/form";
import LabelTemplate from "./labelTemplate";
import Image from "next/image";
import "devextreme-react/text-area";
import { useScreenSize } from "../utils/media-query";
import { ScrollView } from "devextreme-react";
import dynamic from "next/dynamic";

function UserProfile({ userProfile }) {
  const [bio, setBio] = useState(userProfile.notes);

  const employeeRef = useRef(userProfile);

  const { isXSmall, isMedium, isLarge } = useScreenSize();

  const onFieldDataChanged = useCallback((e) => {
    const newFormData = e.component.option("formData");
    employeeRef.current = newFormData;
    const { dataField, value } = e;
    if (dataField === "notes") {
      setBio(value);
    }
  }, []);

  return (
    <React.Fragment>
      <div className="mt-4">
        {!isXSmall && <h2 className={"content-block"}>Profile</h2>}
      </div>
      <ScrollView id={"profile-page-scroll"} className={"content-block"}>
        <div className={"dx-card responsive-paddings mb-8"}>
          <div className={"form-avatar"}>
            <Image
              alt={""}
              height={120}
              width={120}
              src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${userProfile.picture}`}
            />
          </div>
          <span>{bio}</span>
        </div>

        <div className={"dx-card responsive-paddings"}>
          <Form
            id={"form"}
            formData={employeeRef.current}
            onFieldDataChanged={onFieldDataChanged}
            colCountByScreen={colCountByScreen}
          >
            <SimpleItem
              dataField="id"
              editorType="dxTextBox"
              editorOptions={idEditorOptions}
            >
              <Label render={LabelTemplate("info")} />
            </SimpleItem>
            <SimpleItem
              dataField="prefix"
              editorType="dxTextBox"
              editorOptions={idEditorOptions}
            >
              <Label render={LabelTemplate("user")} />
            </SimpleItem>
            <SimpleItem dataField="firstName" editorType="dxTextBox">
              <Label render={LabelTemplate("user")} />
            </SimpleItem>
            <SimpleItem dataField="lastName" editorType="dxTextBox">
              <Label render={LabelTemplate("user")} />
            </SimpleItem>

            <SimpleItem dataField="position" editorType="dxTextBox">
              <Label render={LabelTemplate("info")} />
            </SimpleItem>
            <SimpleItem dataField="birthDate" editorType="dxDateBox">
              <Label render={LabelTemplate("event")} />
            </SimpleItem>
            <SimpleItem dataField="hireDate" editorType="dxDateBox">
              <Label render={LabelTemplate("event")} />
            </SimpleItem>
            <SimpleItem dataField="address" editorType="dxTextBox">
              <Label render={LabelTemplate("home")} />
            </SimpleItem>
            {(isMedium || isLarge) && <EmptyItem />}
            <SimpleItem
              colSpan={2}
              dataField="notes"
              editorType="dxTextArea"
              editorOptions={notesEditorOptions}
            >
              <Label render={LabelTemplate("textdocument")} />
            </SimpleItem>
          </Form>
        </div>
      </ScrollView>
    </React.Fragment>
  );
}

export const UserProfileComponent = dynamic(
  () => Promise.resolve(UserProfile),
  {
    ssr: false,
  }
);

const idEditorOptions = { readOnly: true };
const notesEditorOptions = { height: 100, maxLength: 300 };
const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
};
