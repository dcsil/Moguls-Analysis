import React, { useReducer } from "react";
import Context from "./utils/context";
import * as ACTIONS from "./store/actions/actions";
import * as AuthReducer from "./store/reducers/auth_reducer";
import * as MessageReducer from "./store/reducers/message_reducer";
// import * as DataReducer from "./store/reducers/data_reducer";
import Main from "./components/Main";

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

  // /* Data Reducer */
  // const [stateDataReducer, dispatchDataReducer] = useReducer(
  //   DataReducer.MessageReducer,
  //   DataReducer.initialState
  // );

  // const handleSetData = (data) => {
  //   dispatchDataReducer(ACTIONS.set_data(data));
  // };

  // const handleAddData = (newData) => {
  //   dispatchDataReducer(ACTIONS.add_data(newData));
  // };

  // const handleDeleteData = (_id) => {
  //   dispatchDataReducer(ACTIONS.set_data(_id));
  // };

  return (
    <div>
      <Context.Provider
        value={{
          // Auth Reducer
          authState: stateAuthReducer.isAuth,
          usernameState: stateAuthReducer.username,
          handleUserLogin: (username) => handleLogin(username),
          handleUserLogout: () => handleLogout(),
          // Message Reducer
          loadingState: stateMessageReducer.loading,
          successState: stateMessageReducer.success,
          messageState: stateMessageReducer.msg,
          messageDisplayState: stateMessageReducer.msgDisplay,
          handleSuccess: (msg) => handleSuccess(msg),
          handleFailure: (msg) => handleFailure(msg),
          handleLoading: () => handleLoading(),
          handleClearLoading: () => handleClearLoading(),
          handleClearMessage: () => handleClearMessage(),
          // // Data Reducer
          // dataState: stateDataReducer.allData,
          // handleSetData: (data) => handleSetData(data),
          // handleAddData: (newData) => handleAddData(newData),
          // handleDeleteData: (_id) => handleDeleteData(_id),
        }}
      >
        <Main />
      </Context.Provider>
    </div>
  );
};

export default ContextState;
