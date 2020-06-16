import React from "react";

import { Button, Range } from "./";

import "./Controls.scss";

const Controls = ({
  range,
  arrayLength,
  changeRange,
  sort,
  reset,
  isSorting,
}) => (
  <div className="Controls">
    <Range
      min={range[0]}
      max={range[1]}
      current={arrayLength}
      changeRange={changeRange}
      disabled={isSorting}
    />
    <Button click={() => sort("merge")} disabled={isSorting}>
      Merge Sort
    </Button>
    <Button click={() => sort("bubble")} disabled={isSorting}>
      Bubble Sort
    </Button>
    <Button click={reset} disabled={isSorting}>
      Reset Numbers
    </Button>
  </div>
);

export default Controls;
