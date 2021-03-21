// import for alert
import React, { useContext, useCallback } from "react";
import Context from "../utils/context";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Message() {
  const context = useContext(Context);

  return (
    <Snackbar
      open={context.messageDisplayState}
      autoHideDuration={6000}
      onClose={context.handleClearMessage}
    >
      <Alert
        onClose={context.handleClearMessage}
        severity={context.successState ? "success" : "error"}
      >
        {context.messageState}
      </Alert>
    </Snackbar>
  );
}
