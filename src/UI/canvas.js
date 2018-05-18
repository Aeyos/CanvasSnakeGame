import React from "react";
import Game from "../Objects/Game";

class Canvas extends React.Component {
  componentDidMount() {
    this.game = new Game(this.canvasEl, 600, 600);
    this.game.start();
  }

  restart = () => {
    this.game.restart();
  };

  render() {
    return <canvas ref={e => (this.canvasEl = e)} />;
  }
}

export default Canvas;
