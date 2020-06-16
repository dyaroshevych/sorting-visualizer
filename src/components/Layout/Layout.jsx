import React from "react";
import { mergeSort, bubbleSort } from "../../algorithms";

import { Controls, Items } from "../";

import "./Layout.scss";

const ITEMS_MIN_LENGTH = 10;
const ITEMS_DEFAULT_LENGTH = 50;
const ITEMS_MAX_LENGTH = 100;
const VALUES_RANGE = [10, 100];
const DEFAULT_SORTING_SPEED = 10;

const generateRandomInRange = (min, max) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

class Layout extends React.Component {
  constructor() {
    super();

    const items = this.generateArray(ITEMS_DEFAULT_LENGTH);

    this.state = {
      items,
      length: ITEMS_DEFAULT_LENGTH,
      speed: DEFAULT_SORTING_SPEED,
      maxItem: Math.max(...items),
      range: [...VALUES_RANGE],
      highlighted: new Set(),
      isSorting: false,
    };
  }

  // generate array of random values within default range
  generateArray = (length) => {
    const items = new Array(length);
    for (let i = 0; i < items.length; i++)
      items[i] = generateRandomInRange(...VALUES_RANGE);

    return items;
  };

  // reset an array
  resetArray = () => {
    this.setState({
      items: this.generateArray(this.state.length),
      highlighted: new Set(),
    });
  };

  // run animation after receiving an array of pairs to be highlighted and pairs with index and value to be put there
  animate = (animations) => {
    for (let i = 0; i < animations.length; i++) {
      if (i % 2 === 0) {
        setTimeout(() => {
          const highlighted = new Set();
          for (let animation of animations[i]) {
            highlighted.add(animation[0]);
            highlighted.add(animation[1]);
          }

          this.setState({ highlighted });
        }, this.state.speed * i);
      } else {
        setTimeout(() => {
          const items = [...this.state.items];

          for (let animation of animations[i]) {
            items[animation[0]] = animation[1];
          }

          this.setState({ items });
        }, this.state.speed * Math.floor(i / 2) * 2 + this.state.speed);
      }
    }
  };

  // run a sorting algorithm
  sort = (type) => {
    this.setState({ isSorting: true });

    let animations = [];

    if (type === "merge") animations = mergeSort([...this.state.items]);
    else if (type === "bubble") animations = bubbleSort([...this.state.items]);

    this.animate(animations);

    setTimeout(() => {
      const highlighted = new Set();

      for (let i = 0; i < this.state.items.length; i++) {
        highlighted.add(i);
      }

      this.setState({ isSorting: false, highlighted });
    }, this.state.speed * animations.length + this.state.speed);
  };

  handleRangeChange = (value) => {
    this.setState(
      {
        length: Number(value),
        speed: Math.floor((ITEMS_MAX_LENGTH - value) / 5 + 10),
      },
      () => {
        this.resetArray();
      }
    );
  };

  render() {
    return (
      <div className="Layout">
        <Controls
          range={[ITEMS_MIN_LENGTH, ITEMS_MAX_LENGTH]}
          changeRange={this.handleRangeChange}
          arrayLength={this.state.length}
          sort={this.sort}
          reset={this.resetArray}
          isSorting={this.state.isSorting}
        />
        <Items
          items={this.state.items}
          max={this.state.maxItem}
          highlighted={this.state.highlighted}
        />
      </div>
    );
  }
}

export default Layout;
