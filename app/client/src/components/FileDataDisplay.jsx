import React, { useState, forwardRef, useImperativeHandle } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

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
        fullWidth="true"
        style={{ marginTop: "20px" }}
        disabled={result && Object.keys(result).length === 0}
      >
        Save Results
      </Button>
    </div>
  );
});

export default FileDataDisplay;
