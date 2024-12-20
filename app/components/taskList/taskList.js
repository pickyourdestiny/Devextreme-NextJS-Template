"use client";

import React, { useCallback } from "react";
import "devextreme/data/odata/store";
import DataGrid, {
  Column,
  Pager,
  Paging,
  FilterRow,
  HeaderFilter,
  Search,
  LoadPanel,
  Lookup,
} from "devextreme-react/data-grid";
import {
  LinearGauge,
  Scale,
  Label,
  ValueIndicator,
  RangeContainer,
  Tooltip,
  Range,
} from "devextreme-react/linear-gauge";
import "./taskList.scss";
import { useScreenSize } from "../utils/media-query";

function customizeText({ valueText }) {
  return `${valueText} %`;
}

function customizeTooltip(arg) {
  let result = `${arg.valueText} %`;

  result = `Completed: ${result}`;

  return {
    text: result,
  };
}

function renderTaskSubject(arg) {
  return <div className="text-wrap">{arg.value}</div>;
}

function renderPercentage(args) {
  return args && <div>{args.value} %</div>;
}

export default function TaskList() {
  const { isXSmall } = useScreenSize();

  const onAdaptiveDetailRowPreparing = useCallback((e) => {
    for (let formItem of e.formOptions.items) {
      if (
        formItem.dataField == "Task_Completion" ||
        formItem.dataField === "Task_Subject"
      ) {
        formItem.colCount = 2;
        formItem.colSpan = 2;
      }
    }
    e.formOptions.colCountByScreen = {
      xs: 2,
      sm: 2,
      md: 3,
      lg: 3,
    };
  }, []);

  const renderGauge = useCallback((e) => {
    if (e.value === 0 || !e.value) {
      return "Not Started";
    } else {
      return (
        <LinearGauge id="linear-gauge" value={e.value}>
          <Scale startValue={0} endValue={100} tickInterval={20}>
            <Label customizeText={customizeText}></Label>
          </Scale>
          <Tooltip enabled={true} customizeTooltip={customizeTooltip} />
          <RangeContainer offset={10}>
            <Range startValue={0} endValue={50} color="#92000A" />
            <Range startValue={50} endValue={80} color="#E6E200" />
            <Range startValue={80} endValue={100} color="#77DD77" />
          </RangeContainer>
          <ValueIndicator
            offset={20}
            type="rangeBar"
            color="#483D8B"
          ></ValueIndicator>
        </LinearGauge>
      );
    }
  }, []);

  return (
    <React.Fragment>
      {!isXSmall && <h2 className={"content-block"}>Tasks</h2>}

      <DataGrid
        id={"task-list"}
        className={"dx-card wide-card"}
        dataSource={dataSource}
        showBorders={false}
        focusedRowEnabled={true}
        showColumnHeaders={true}
        onAdaptiveDetailRowPreparing={onAdaptiveDetailRowPreparing}
        defaultFocusedRowIndex={0}
        columnAutoWidth={true}
        columnHidingEnabled={true}
      >
        <Paging defaultPageSize={10} />
        <Pager showPageSizeSelector={true} showInfo={true} />
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />
        <LoadPanel enabled={false} />

        <Column
          dataField={"Task_ID"}
          width={85}
          hidingPriority={9}
          allowHeaderFiltering={false}
        />
        <Column
          dataField={"Task_Subject"}
          width={190}
          caption={"Subject"}
          hidingPriority={8}
          allowHeaderFiltering={false}
          cellRender={renderTaskSubject}
        />
        <Column
          dataField="Task_Completion"
          caption={"Progress"}
          hidingPriority={7}
          allowHeaderFiltering={false}
          allowFiltering={false}
          cellRender={renderGauge}
          alignment="center"
          colCountByScreen={1}
        />
        <Column
          dataField="Task_Completion"
          name="Percent_Completed"
          caption={"% Completed"}
          hidingPriority={6}
          allowHeaderFiltering={false}
          allowFiltering={true}
          cellRender={renderPercentage}
          alignment="center"
        />
        <Column
          dataField={"Task_Status"}
          caption={"Status"}
          hidingPriority={3}
          allowHeaderFiltering={true}
          allowFiltering={false}
        />
        <Column
          dataField={"Task_Priority"}
          caption={"Priority"}
          hidingPriority={4}
          allowHeaderFiltering={true}
          allowFiltering={false}
        >
          <Lookup
            dataSource={priorities}
            valueExpr={"value"}
            displayExpr={"name"}
          />
        </Column>

        <Column
          dataField={"ResponsibleEmployee.Employee_Full_Name"}
          caption={"Assigned To"}
          allowSorting={false}
          hidingPriority={5}
          allowHeaderFiltering={true}
          allowFiltering={false}
        >
          <HeaderFilter>
            <Search
              editorOptions={searchEditorOptions}
              enabled={true}
              timeout={700}
            />
          </HeaderFilter>
        </Column>
        <Column
          dataField={"Task_Start_Date"}
          caption={"Start Date"}
          dataType={"date"}
          hidingPriority={2}
          allowHeaderFiltering={false}
        />
        <Column
          dataField={"Task_Due_Date"}
          caption={"Due Date"}
          dataType={"date"}
          hidingPriority={1}
          allowHeaderFiltering={false}
        />
      </DataGrid>
    </React.Fragment>
  );
}

const dataSource = {
  store: {
    version: 2,
    type: "odata",
    key: "Task_ID",
    url: "https://js.devexpress.com/Demos/DevAV/odata/Tasks",
  },
  expand: "ResponsibleEmployee",
  select: [
    "Task_ID",
    "Task_Subject",
    "Task_Start_Date",
    "Task_Due_Date",
    "Task_Status",
    "Task_Priority",
    "Task_Completion",
    "ResponsibleEmployee/Employee_Full_Name",
  ],
};

const priorities = [
  { name: "High", value: 4 },
  { name: "Urgent", value: 3 },
  { name: "Normal", value: 2 },
  { name: "Low", value: 1 },
];

const searchEditorOptions = {
  placeholder: "Search by first or last name",
  mode: "text",
};
