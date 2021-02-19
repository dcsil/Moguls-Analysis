import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    textAlign: "center",
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    color: theme.palette.text.secondary,
    minHeight: "400px",
    marginTop: "20px",
  },
  button: {
    marginTop: "20px",
  },
}));

const FileDataDisplay = forwardRef((props, ref) => {
  const classes = useStyles();

  const [result, setResult] = useState({});
  const [athlete, setAthlete] = useState("");
  const [date, setDate] = useState(null);
  const [trick, setTrick] = useState("");
  const [dialogOpen, setDialogOpen] = React.useState(false);

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleDialogCloseAndSave = (event) => {
    event.preventDefault();
    handleDialogClose();
    const newResult = {
      ...result,
      name: athlete,
      date: date,
      trick: trick,
      _id: "999",
    };
    props.handleNewResultSave(newResult);
  };

  const handleDialogTextChange = (event) => {
    const { name, value } = event.target;
    if (name == "athlete") {
      setAthlete(value);
    } else if (name == "date") {
      setDate(value);
    } else {
      setTrick(value);
    }
  };

  useImperativeHandle(ref, () => ({
    displayResult(resultObj) {
      setResult(resultObj);
    },
  }));

  return (
    <div>
      <Paper className={classes.paper}>
        {result && Object.keys(result).length === 0 ? (
          <div>
            <h2>Upload a video from left</h2>
            <h2>&amp;</h2>
            <h2>Click "START ANALYZE"</h2>
          </div>
        ) : (
          <div>
            <h3 style={{ marginBottom: "20px" }}>
              File name: {result.videoName}
            </h3>
            <h3 style={{ marginBottom: "10px" }}>
              Angle between knees and hip: {result.kneeHipAngle}
            </h3>
            <h3 style={{ marginBottom: "10px" }}>
              Angle between hip and chest: {result.hipChestAngle}
            </h3>
            <h3 style={{ marginBottom: "10px" }}>
              Angle between chest and arms: {result.chestArmAngle}
            </h3>
            <h3 style={{ marginBottom: "10px" }}>
              Angle difference between arms: {result.armsAngleDiff}
            </h3>
            <h3 style={{ marginBottom: "10px" }}>
              Angle difference between knees: {result.kneesAngleDiff}
            </h3>
          </div>
        )}
      </Paper>
      <Button
        variant="contained"
        color="secondary"
        size="large"
        fullWidth={true}
        style={{ marginTop: "20px" }}
        disabled={result && Object.keys(result).length === 0}
        onClick={handleDialogClickOpen}
      >
        Save Results
      </Button>

      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">
          <h3>Data Information</h3>
        </DialogTitle>
        <form onSubmit={handleDialogCloseAndSave}>
          <DialogContent>
            <DialogContentText>
              Please fill in the following data information before saving:
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="athlete"
              name="athlete"
              label="Athlete Name"
              onChange={handleDialogTextChange}
              value={athlete}
              fullWidth
            />
            <TextField
              id="date"
              name="date"
              label="Date"
              type="date"
              className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              // value={date}
              onChange={handleDialogTextChange}
            />
            <TextField
              autoFocus
              margin="dense"
              id="trick"
              name="trick"
              label="Trick Name"
              value={trick}
              onChange={handleDialogTextChange}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="secondary">
              Cancel
            </Button>
            <Button color="primary" type="submit">
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
});

export default FileDataDisplay;
