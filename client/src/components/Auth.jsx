import React, { useState } from "react";
import Header from "./Header";
import Login from "./Login";
import Signup from "./Signup";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);
  return (
    <div>
      <Header />
      {showLogin ? <Login /> : <Signup />}
    </div>
  );
}
