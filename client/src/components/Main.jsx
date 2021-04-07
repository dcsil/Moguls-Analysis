import React, { useContext } from "react";
import Header from "./Header";
import Analyzer from "./Analyzer";
import Auth from "./Auth";
import Context from "../utils/context";
import Message from "./Message";

function Main() {
  const context = useContext(Context);

  return (
    <div>
      {context.authState ? (
        <div>
          <Header />
          <Analyzer />
          <Message />
        </div>
      ) : (
        <div>
          <Header />
          <Message />
          <Auth />
        </div>
      )}
    </div>
  );
}

export default Main;
