import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileUpload from "./FileUpload";
import FileDataDisplay from "./FileDataDisplay";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SavedDataTable from "./SavedDataTable";
// import FilterGrid from "./FilterGrid";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

export default function Analyzer() {
  const classes = useStyles();
  const [result, setResult] = useState({});
  const resultDisplayChild = useRef();
  const resultSaveChild = useRef();

  function handleResult(resultObj) {
    // update current saved results
    setResult(resultObj);
    // update current displaying metrics
    resultDisplayChild.current.displayResult(resultObj);
  }

  function handleNewResultSave(newResult) {
    resultSaveChild.current.addSavedResult(newResult);
  }

  return (
    <Container maxWidth="lg" className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FileUpload onClick={handleResult} />
        </Grid>
        <Grid item xs={12} sm={6}>
          <FileDataDisplay
            ref={resultDisplayChild}
            handleNewResultSave={handleNewResultSave}
          />
        </Grid>
      </Grid>
      <SavedDataTable ref={resultSaveChild} />
      {/* <FilterGrid /> */}
    </Container>
  );
}
