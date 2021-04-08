import React, { useState, useRef, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import FileUpload from "./FileUpload";
import FileDataDisplay from "./FileDataDisplay";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import SavedDataTable from "./SavedDataTable";
import Context from "../utils/context";
import { saveData } from "../utils/fetch";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(8),
    flexGrow: 1,
  },
}));

export default function Analyzer() {
  const classes = useStyles();
  const context = useContext(Context);

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
      context.handleLoading();
      console.log("current token: " + context.tokenState);
      const resultBack = await saveData(newResult, context.tokenState);
      context.handleClearLoading();
      if (resultBack.status === 200) {
        context.handleSuccess("Data is successfully saved.");
        console.log(resultBack.data);
        newResult = { ...newResult, _id: resultBack.data };
        resultSaveChild.current.addSavedResult(newResult);
      } else {
        context.handleFailure(resultBack.data);
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
