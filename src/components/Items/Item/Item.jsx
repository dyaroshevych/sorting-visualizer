import React, { memo } from "react";

import "./Item.scss";

const Item = ({ val, max }) => (
  <div className="Item" style={{ height: `${(val * 100) / max}%` }}></div>
);

export default memo(
  Item,
  (prevProps, nextProps) =>
    prevProps.val !== nextProps.val ||
    prevProps.highlited !== nextProps.highlited ||
    prevProps.max !== nextProps.max
);
