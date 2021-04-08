import React, { useContext, useEffect } from "react";
import Header from "./Header";
import Analyzer from "./Analyzer";
import Auth from "./Auth";
import Context from "../utils/context";
import Message from "./Message";
import { useCookies } from "react-cookie";

function Main() {
  const context = useContext(Context);
  const [cookies, setCookie] = useCookies(["loginInfo"]);

  useEffect(() => {
    if (cookies.loginInfo && cookies.loginInfo.token) {
      context.handleUserLogin({
        username: cookies.loginInfo.username,
        token: cookies.loginInfo.token,
      });
    }
  }, []);

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
