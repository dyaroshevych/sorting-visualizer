import React from "react";

import "./Button.scss";

const Button = ({ click, children }) => (
  <button className="Button" onClick={click}>
    {children}
  </button>
);

export default Button;
