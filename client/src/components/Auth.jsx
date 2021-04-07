import React, { useState } from "react";
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  const switchLogin = () => {
    setShowLogin(true);
  };
  const switchRegister = () => {
    setShowLogin(false);
  };

  return (
    <div>
      <Header />
      {showLogin ? (
        <Login switchRegister={switchRegister} />
      ) : (
        <Signup switchLogin={switchLogin} />
      )}
    </div>
  );
}
