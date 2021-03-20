import React, { useState, useRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileUpload from "./FileUpload";
import FileDataDisplay from "./FileDataDisplay";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SavedDataTable from "./SavedDataTable";

import { saveData } from "../action/fetch";

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
    const saveDataToDatabase = async () => {
      const resultBack = await saveData(newResult);
      if (resultBack.status === 200) {
        console.log("succcess");
        console.log(resultBack.data);
        // TODO: refresh table data
      } else {
        console.log(resultBack.data);
      }
    };
    saveDataToDatabase();
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
    </Container>
  );
}
