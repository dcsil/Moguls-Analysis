// import for alert
import React, { useContext } from "react";
import Context from "../utils/context";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Message() {
  const context = useContext(Context);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    context.handleClearMessage();
  };

  return (
    context.messageDisplayState && (
      <Snackbar
        open={context.messageDisplayState}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={context.successState ? "success" : "error"}
        >
          {context.messageState}
        </Alert>
      </Snackbar>
    )
  );
}
