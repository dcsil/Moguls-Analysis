import React, { useContext } from "react";
import Header from "./Header";
import Analyzer from "./Analyzer";
import Auth from "./Auth";
import Context from "../utils/context";
import Message from "./Message";

function Main() {
  const context = useContext(Context);

  let content = <Auth />;

  if (context.authState) {
    content = (
      <div>
        <Header />
        <Analyzer />
        <Message />
      </div>
    );
  }

  return content;
}

export default Main;
