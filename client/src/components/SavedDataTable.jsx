import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useContext,
} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import FilterGrid from "./FilterGrid";
import { deleteData, getAllData } from "../utils/fetch";
import Context from "../utils/context";
import data from "../utils/some_data";
import {
  EnhancedTableToolbar,
  EnhancedTableHead,
  stableSort,
  getComparator,
} from "./EnhancedTableHead";

// code references: https://codesandbox.io/s/f71wj by Material-UI

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  paper: {
    width: "100%",
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: "rect(0 0 0 0)",
    height: 1,
    margin: -1,
    overflow: "hidden",
    padding: 0,
    position: "absolute",
    top: 20,
    width: 1,
  },
}));

const DataTable = forwardRef((props, ref) => {
  const classes = useStyles();
  const context = useContext(Context);
  const filterChild = useRef();

  const [order, setOrder] = useState("desc");
  const [orderBy, setOrderBy] = useState("date");
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(true);

  // handler for parent component to add new saved result
  useImperativeHandle(ref, () => ({
    addSavedResult(newResult) {
      // update self
      setRows((prevState) => {
        // update child
        let updatedResults = [...prevState, newResult];
        console.log(updatedResults);
        filterChild.current.updateRows(updatedResults);
        return updatedResults;
      });
    },
  }));

  useEffect(() => {
    const setTableData = async () => {
      context.handleLoading();
      console.log(context.tokenState);
      const resultBack = await getAllData(context.tokenState);
      context.handleClearLoading();
      console.log(data);
      if (resultBack.status === 200) {
        setRows(Object.values(resultBack.data));
        console.log(resultBack.data);
      } else {
        context.handleFailure(resultBack.data);
      }
    };
    setTableData();
  }, []);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n._id);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleDelete = async (event) => {
    const selectedRows = rows.filter((row) => {
      return selected.includes(row._id);
    });

    // TODO: call delete request for each selected item
    context.handleLoading();
    for (let i = 0; i < selectedRows.length; i++) {
      let selectedRowId = selectedRows[i]._id;
      const resultBack = await deleteData(selectedRowId, context.tokenState);
      if (resultBack.status !== 200) {
        context.handleFailure(resultBack.data);
        return;
      }
    }
    context.handleClearLoading();
    // requests all success
    context.handleSuccess("Successfully deleted selected record(s).");

    // update state of self
    const newRows = rows.filter((row) => {
      return !selected.includes(row._id);
    });
    setRows(newRows);
    // update state of child
    filterChild.current.updateRows(newRows);
    setSelected([]);
  };

  const handleOpenFilter = () => {
    setOpen(false);
  };

  const handleExitFilter = () => {
    setOpen(true);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  return open ? (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          numSelected={selected.length}
          handleDelete={handleDelete}
          handleOpenFilter={handleOpenFilter}
        />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={dense ? "small" : "medium"}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onDeleteClick={handleDelete}
              onOpenFilter={handleOpenFilter}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row._id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row._id}
                      </TableCell>
                      <TableCell align="left">{row.name}</TableCell>
                      <TableCell align="left" padding="none">
                        {row.date}
                      </TableCell>
                      <TableCell align="left">{row.trick}</TableCell>
                      <TableCell align="right">{row.kneeHipAngle}</TableCell>
                      <TableCell align="right">{row.hipChestAngle}</TableCell>
                      <TableCell align="right">{row.chestArmAngle}</TableCell>
                      <TableCell align="right">{row.armAngleDiff}</TableCell>
                      <TableCell align="right">{row.kneeAngleDiff}</TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                  <TableCell colSpan={10} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
      <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
        style={{ marginBottom: "20px" }}
      />
      <FilterGrid
        ref={filterChild}
        initialRows={rows}
        exitFilter={handleExitFilter}
        style={{ display: "none" }}
      />
    </div>
  ) : (
    <FilterGrid
      ref={filterChild}
      initialRows={rows}
      exitFilter={handleExitFilter}
    />
  );
});

export default DataTable;
