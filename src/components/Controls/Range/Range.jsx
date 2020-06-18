import React from "react";

import "./Range.scss";

const Range = ({ changeRange, min, max, current, disabled }) => {
  const handleChange = (event) => changeRange(event.target.value);

  return (
    <div className="Range">
      <label htmlFor="range" className="Range_label">
        Number of elements:
      </label>
      <input
        className="Range_input"
        id="range"
        type="range"
        min={min}
        max={max}
        value={current}
        step={1}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
};
export default Range;
