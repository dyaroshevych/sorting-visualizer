import React from "react";
import { mergeSort } from "../../algorithms";

import { Controls, Items } from "../";

import "./Layout.scss";

const ITEMS_RANGE = [10, 100];
const ITEMS_LENGTH = 50;

const generateRandomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class Layout extends React.Component {
  constructor() {
    super();

    this.state = {
      items: this.generateArray(),
      range: [...ITEMS_RANGE],
    };
  }

  generateArray = () => {
    const items = new Array(ITEMS_LENGTH);
    for (let i = 0; i < items.length; i++)
      items[i] = generateRandomInRange(...ITEMS_RANGE);

    return items;
  };

  resetArray = () => {
    this.setState({ items: this.generateArray() });
  };

  sort = (type) => {
    let items = this.state.items;

    if (type === "merge") items = mergeSort(items);

    this.setState({ items });
  };

  render() {
    return (
      <div className="Layout">
        <Controls sort={this.sort} reset={this.resetArray} />
        <Items items={this.state.items} />
      </div>
    );
  }
}

export default Layout;
