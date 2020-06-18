import React from "react";

import { Button, Range } from "./";

import "./Controls.scss";

const Controls = ({
  iterationsCount,
  range,
  arrayLength,
  changeRange,
  sort,
  reset,
  isSorting,
}) => (
  <div className="Controls">
    <div className="Controls_stats">
      <Range
        min={range[0]}
        max={range[1]}
        current={arrayLength}
        changeRange={changeRange}
        disabled={isSorting}
      />
      <span>Iterations count: {iterationsCount}</span>
      <Button click={reset} disabled={isSorting} color="red">
        Reset Numbers
      </Button>
    </div>
    <div className="Controls_buttons">
      <Button click={() => sort("merge")} disabled={isSorting}>
        Merge Sort
      </Button>
      <Button click={() => sort("quick")} disabled={isSorting}>
        Quick Sort
      </Button>

      <Button click={() => sort("insertion")} disabled={isSorting}>
        Insertion Sort
      </Button>
      <Button click={() => sort("bubble")} disabled={isSorting}>
        Bubble Sort
      </Button>
    </div>
  </div>
);

export default Controls;
