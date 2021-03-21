import React, { useContext } from "react";
import Header from "./Header";
import Analyzer from "./Analyzer";
import Auth from "./Auth";
import Context from "../utils/context";
import LinearProgress from "@material-ui/core/LinearProgress";

function Main() {
  const context = useContext(Context);

  let content = <Auth />;

  if (context.isAuth) {
    content = (
      <div>
        {/* <LinearProgress /> */}
        <Header />
        <Analyzer />
      </div>
    );
  }

  return content;
}

export default Main;
