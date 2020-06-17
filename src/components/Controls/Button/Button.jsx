import React from "react";

import "./Button.scss";

const Button = ({ click, disabled, color, children }) => (
  <button className="Button" onClick={click} disabled={disabled} color={color}>
    {children}
  </button>
);

export default Button;
