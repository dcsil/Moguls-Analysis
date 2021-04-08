import React, { useState } from "react";
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
      {showLogin ? (
        <Login switchRegister={switchRegister} />
      ) : (
        <Signup switchLogin={switchLogin} />
      )}
    </div>
  );
}
