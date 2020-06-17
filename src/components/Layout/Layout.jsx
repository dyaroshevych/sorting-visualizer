import React from "react";
import { mergeSort, bubbleSort, quickSort } from "../../algorithms";

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

    const [items, maxItem] = this.generateArray(ITEMS_DEFAULT_LENGTH);

    this.state = {
      items,
      maxItem,
      iterations: 0,
      length: ITEMS_DEFAULT_LENGTH,
      speed: DEFAULT_SORTING_SPEED,
      highlighted: new Set(),
      isSorting: false,
      isSorted: false,
    };
  }

  // generate array of random values within default range
  generateArray = (length) => {
    const items = new Array(length);
    for (let i = 0; i < items.length; i++)
      items[i] = generateRandomInRange(...VALUES_RANGE);

    return [items, Math.max(...items)];
  };

  // reset an array
  resetArray = () => {
    const [items, maxItem] = this.generateArray(this.state.length);
    this.setState({
      items,
      maxItem,
      highlighted: new Set(),
      isSorted: false,
      iterations: 0,
    });
  };

  // run animation after receiving an array of pairs to be highlighted and pairs with index and value to be put there
  animate = (animations) => {
    for (let i = 0; i < animations.length; i++) {
      if (i % 2 === 0) {
        // if the index of animation is even, highlight the given pair of items
        setTimeout(() => {
          const highlighted = new Set();
          for (let animation of animations[i]) {
            highlighted.add(animation[0]);
            highlighted.add(animation[1]);
          }

          this.setState({ highlighted, iterations: this.state.iterations + 1 });
        }, this.state.speed * i);
      } else {
        // if the index of animation is odd, place the given value into a cell with the given index
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
    this.setState({ isSorting: true, isSorted: false, iterations: 0 });

    let animations = [];

    // get an array of animations depending on sorting algorithm
    switch (type) {
      case "merge":
        animations = mergeSort([...this.state.items]);
        break;
      case "bubble":
        animations = bubbleSort([...this.state.items]);
        break;
      case "quick":
        animations = quickSort([...this.state.items]);
        break;

      default:
    }

    // perform given animations
    this.animate(animations);

    // when all animations are displayed, enable buttons and highlight all items
    setTimeout(() => {
      const highlighted = new Set();

      for (let i = 0; i < this.state.items.length; i++) {
        highlighted.add(i);
      }

      this.setState({ isSorting: false, highlighted, isSorted: true });
    }, this.state.speed * animations.length + this.state.speed);
  };

  // when the array range is changed, reset the array with an updated length
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
        <h1>Sorting Visualizer</h1>
        <Controls
          range={[ITEMS_MIN_LENGTH, ITEMS_MAX_LENGTH]}
          changeRange={this.handleRangeChange}
          arrayLength={this.state.length}
          sort={this.sort}
          reset={this.resetArray}
          isSorting={this.state.isSorting}
        />
        <span>Iterations count: {this.state.iterations}</span>
        <Items
          items={this.state.items}
          max={this.state.maxItem}
          highlighted={this.state.highlighted}
          isSorted={this.state.isSorted}
        />
      </div>
    );
  }
}

export default Layout;
