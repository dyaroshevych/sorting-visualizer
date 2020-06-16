import React from "react";

import "./Button.scss";

const Button = ({ click, disabled, children }) => (
  <button className="Button" onClick={click} disabled={disabled}>
    {children}
  </button>
);

export default Button;
