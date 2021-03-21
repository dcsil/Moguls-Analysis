import React, { useReducer } from "react";
import Context from "./utils/context";
import * as ACTIONS from "./store/actions/actions";
import * as AuthReducer from "./store/reducers/auth_reducer";
import * as MessageReducer from "./store/reducers/message_reducer";
import Main from "./components/Main";

// import Auth from "./utils/auth";

const ContextState = () => {
  /* Auth Reducer */
  const [stateAuthReducer, dispatchAuthReducer] = useReducer(
    AuthReducer.AuthReducer,
    AuthReducer.initialState
  );

  const handleLogin = (username) => {
    dispatchAuthReducer(ACTIONS.login_success(username));
  };

  const handleLogout = () => {
    dispatchAuthReducer(ACTIONS.logout());
  };

  /* Message Reducer */
  const [stateMessageReducer, dispatchMessageReducer] = useReducer(
    MessageReducer.MessageReducer,
    MessageReducer.initialState
  );

  const handleSuccess = (msg) => {
    dispatchMessageReducer(ACTIONS.success(msg));
  };

  const handleFailure = (msg) => {
    dispatchMessageReducer(ACTIONS.failure(msg));
  };

  const handleLoading = () => {
    dispatchMessageReducer(ACTIONS.loading());
  };

  const handleClearLoading = () => {
    dispatchMessageReducer(ACTIONS.clear_loading());
  };

  const handleClearMessage = () => {
    dispatchMessageReducer(ACTIONS.clear_msg());
  };

  return (
    <div>
      <Context.Provider
        value={{
          //Auth Reducer
          authState: stateAuthReducer.isAuth,
          usernameState: stateAuthReducer.username,
          handleUserLogin: (username) => handleLogin(username),
          handleUserLogout: () => handleLogout(),
          loadingState: stateMessageReducer.loading,
          successState: stateMessageReducer.success,
          messageState: stateMessageReducer.msg,
          messageDisplayState: stateMessageReducer.msgDisplay,
          handleSuccess: (msg) => handleSuccess(msg),
          handleFailure: (msg) => handleFailure(msg),
          handleLoading: () => handleLoading(),
          handleClearLoading: () => handleClearLoading(),
          handleClearMessage: () => handleClearMessage(),
        }}
      >
        <Main />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
