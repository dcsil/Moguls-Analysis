import React, { useState, forwardRef, useImperativeHandle } from "react";
import Paper from "@material-ui/core/Paper";
import { DataGrid, GridToolbar } from "@material-ui/data-grid";
import { Button } from "@material-ui/core";

const filterHeadCells = [
  {
    field: "id",
    headerName: "ID",
    flex: 1,
  },
  {
    field: "name",
    headerName: "Athlete Name",
    flex: 2,
  },
  { field: "date", headerName: "Date", flex: 1.5 },
  {
    field: "trick",
    headerName: "Trick",
    flex: 1.5,
  },
  {
    field: "kneeHipAngle",
    type: "number",
    headerName: "Knees-Hip Angle",
    flex: 1.5,
  },
  {
    field: "hipChestAngle",
    type: "number",
    headerName: "Hip-chest Angle",
    flex: 1.5,
  },
  {
    field: "chestArmAngle",
    type: "number",
    headerName: "Chest-Arms Angle",
    flex: 1.5,
  },
  {
    field: "armAngleDiff",
    type: "number",
    headerName: "Arms Angle Difference",
    flex: 1.5,
  },
  {
    field: "kneeAngleDiff",
    type: "number",
    headerName: "Knees Angle Difference",
    flex: 1.5,
  },
];

const dataFilterModel = {
  items: [],
};

function convertedToFilterRows(rows) {
  let formattedData = rows.map((row) => {
    return {
      id: row._id,
      name: row.name,
      date: row.date,
      trick: row.trick,
      kneeHipAngle: row.kneeHipAngle,
      hipChestAngle: row.hipChestAngle,
      chestArmAngle: row.chestArmAngle,
      armAngleDiff: row.armAngleDiff,
      kneeAngleDiff: row.kneeAngleDiff,
    };
  });
  return formattedData;
}

const FilterGrid = forwardRef((props, ref) => {
  const [filterRowsData, setFilterRowData] = useState(
    convertedToFilterRows(props.initialRows)
  );

  useImperativeHandle(ref, () => ({
    updateRows(rows) {
      let formattedData = convertedToFilterRows(rows);
      setFilterRowData(formattedData);
    },
  }));

  return (
    <div style={{ ...props.style }}>
      <Paper style={{ marginTop: "30px" }}>
        <div style={{ height: 500, width: "100%" }}>
          <DataGrid
            columns={filterHeadCells}
            rows={filterRowsData}
            filterModel={dataFilterModel}
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </div>
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth={true}
        style={{ marginTop: "20px", marginBottom: "40px" }}
        onClick={props.exitFilter}
      >
        Exit Filtering Mode
      </Button>
    </div>
  );
});

export default FilterGrid;
