import React from "react";

const Logo = (props) => {
  return (
    <img
      alt="Logo"
      src="/static/logo.png"
      width={props.size + "px"}
      style={{ margin: "10px" }}
      {...props}
    />
  );
};

export default Logo;
