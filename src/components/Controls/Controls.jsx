import React from "react";

import { Button } from "./";

import "./Controls.scss";

class Controls extends React.Component {
  render() {
    return (
      <div className="Controls">
        <Button click={() => this.props.sort("merge")}>Merge Sort</Button>
        <Button click={this.props.reset}>Reset Numbers</Button>
      </div>
    );
  }
}

export default Controls;
