"use client";

import React, { useState, useRef } from "react";
import {
  Form,
  FormTypes,
  SimpleItem,
  Label,
  EmptyItem,
} from "devextreme-react/form";
import LabelTemplate from "./labelTemplate";
import "devextreme-react/text-area";
import { useScreenSize } from "@/utils/media-query";
import Image from "next/image";
import "./profileForm.scss";
import { updateUserProfile } from "@/app/api/auth/customAuth";
import { ProfileType } from "@/types";

export default function ProfileForm({ userProfile }: ProfileType) {
  const { isMedium, isLarge } = useScreenSize();

  const [notes, setNotes] = useState(userProfile.notes);

  const formDataRef = useRef(userProfile);

  const onFieldDataChanged = async (e: FormTypes.FieldDataChangedEvent) => {
    const { dataField, value } = e;

    if (dataField === "notes") {
      setNotes(value);
    }

    const newUserProfile: ProfileType = {
      userProfile: e.component.option("formData"),
    };

    /* call an imported server action (not bound to the form directly since the user will already be signed in) 
    to automatically update the user profile in the database*/

    await updateUserProfile(newUserProfile);
  };

  return (
    <React.Fragment>
      <div className={"dx-card responsive-paddings mb-8"}>
        <div className={"form-avatar"}>
          <Image
            id={"avatar-image"}
            alt={""}
            height={120}
            width={120}
            src={`https://js.devexpress.com/Demos/WidgetsGallery/JSDemos/${userProfile.picture}`}
          />
        </div>
        <div className="flex max-bio-height">{notes}</div>
      </div>
      <div className={"dx-card responsive-paddings"}>
        <Form
          formData={formDataRef.current}
          id={"form"}
          colCountByScreen={colCountByScreen}
          onFieldDataChanged={onFieldDataChanged}
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
    </React.Fragment>
  );
}

const idEditorOptions = { readOnly: true };
const notesEditorOptions = { height: 100, maxLength: 300 };
const colCountByScreen = {
  xs: 1,
  sm: 2,
  md: 3,
  lg: 3,
};
