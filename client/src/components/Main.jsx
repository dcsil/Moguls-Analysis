import React from "react";
import Header from "./Header";
import Analyzer from "./Analyzer";
import LinearProgress from "@material-ui/core/LinearProgress";

function Main() {
  return (
    <div>
      {/* <LinearProgress /> */}
      <Header />
      <Analyzer />
    </div>
  );
}

export default Main;
