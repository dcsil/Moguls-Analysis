import React, { useState } from "react";
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

function FileDataDisplay(props) {
  const classes = useStyles();

  const [result, setResult] = useState({});

  return (
    <div>
      <Paper className={classes.paper}>
        {result && Object.keys(result).length === 0 ? (
          <div>
            <h2>Upload a video from left</h2>
            <h3>&amp;</h3>
            <h3>Click "START ANALYZE"</h3>
          </div>
        ) : null}
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
}

export default FileDataDisplay;
