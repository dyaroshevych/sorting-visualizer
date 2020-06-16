import React from "react";

import { Item } from ".";

import "./Items.scss";

const Items = ({ items, max, highlighted }) => (
  <div className="Items">
    {items.map((val, idx) => {
      return (
        <Item
          val={val}
          max={max}
          key={val * 100 + Math.random() * 100}
          highlighted={highlighted.has(idx)}
        />
      );
    })}
  </div>
);

export default Items;
