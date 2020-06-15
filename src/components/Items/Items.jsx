import React from "react";

import { Item } from ".";

import "./Items.scss";

const Items = ({ items }) => {
  const maxItem = Math.max(...items);

  return (
    <div className="Items">
      {items.map((val) => {
        return (
          <Item val={val} max={maxItem} key={val * 100 + Math.random() * 100} />
        );
      })}
    </div>
  );
};

export default Items;
