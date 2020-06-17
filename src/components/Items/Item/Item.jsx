import React, { memo } from "react";

import "./Item.scss";

const Item = ({ val, max, highlighted, itemsSorted }) => (
  <div
    className="Item"
    style={{ height: `${(val * 98) / max}%` }}
    highlighted={String(highlighted)}
    sorted={String(itemsSorted)}
  ></div>
);

export default memo(
  Item,
  (prevProps, nextProps) =>
    prevProps.val !== nextProps.val ||
    prevProps.highlited !== nextProps.highlited ||
    prevProps.max !== nextProps.max
);
