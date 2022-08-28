import React from "react";

import classes from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      type={props.type || "button"}
      className={`${classes.button} ${props.className}`}
      // if ctx.onLogout is used here, it would make this button to become a logout button wherever it is used.
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
