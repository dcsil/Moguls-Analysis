import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useRef,
  useEffect,
  useContext,
} from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Checkbox from "@material-ui/core/Checkbox";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import DeleteIcon from "@material-ui/icons/Delete";
import FilterListIcon from "@material-ui/icons/FilterList";
import FilterGrid from "./FilterGrid";
import { deleteData, getAllData } from "../utils/fetch";
import Context from "../utils/context";
import data from "../utils/some_data";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// Sort by values, and break ties by index
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: "_id",
    numeric: false,
    disablePadding: true,
    label: "ID",
    tip: "Record ID",
  },
  {
    id: "name",
    numeric: false,
    disablePadding: false,
    label: "Athlete Name",
  },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
  {
    id: "trick",
    numeric: false,
    disablePadding: false,
    label: "Trick",
  },
  {
    id: "kneeHipAngle",
    numeric: true,
    disablePadding: false,
    label: "Knees-Hip Angle",
    tip:
      "Angle between knees and hip relative to 180° (a value less than 0 indicates an angle less than 180°)",
  },
  {
    id: "hipChestAngle",
    numeric: true,
    disablePadding: false,
    label: "Hip-chest Angle",
    tip:
      "Angle between hip and chest relative to 180° (a value less than 0 indicates an angle less than 180°)",
  },
  {
    id: "chestArmAngle",
    numeric: true,
    disablePadding: false,
    label: "Chest-Arms Angle",
    tip:
      "Angle between chest and arm relative to 180° (a value less than 0 indicates an angle less than 180°) ",
  },
  {
    id: "armAngleDiff",
    numeric: true,
    disablePadding: false,
    label: "Arms Angle Difference",
    tip:
      "Angle difference between two arms (the value is absolute difference so greater than or equal to 0)",
  },
  {
    id: "kneeAngleDiff",
    numeric: true,
    disablePadding: false,
    label: "Knees Angle Difference",
    tip:
      "Angle difference between two knees (the value is absolute difference so greater than or equal to 0)",
  },
];

function EnhancedTableHead(props) {
  const {
    classes,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all" }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "default"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              <Tooltip title={headCell.tip || ""} placement="top">
                <div>{headCell.label}</div>
              </Tooltip>
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onOpenFilter: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
    marginTop: "30px",
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: "1 1 100%",
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          className={classes.title}
          variant="h4"
          id="tableTitle"
          component="div"
        >
          Saved Data
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete" onClick={props.handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Enter Filtering Mode">
          <IconButton aria-label="filter list" onClick={props.handleOpenFilter}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleOpenFilter: PropTypes.func.isRequired,
};

// Below start the data table

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
      const resultBack = await getAllData();
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
      const resultBack = await deleteData(selectedRowId);
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
