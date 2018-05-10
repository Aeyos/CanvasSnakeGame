import React from 'react';
import Game from '../Objects/Game';

class Canvas extends React.Component {
  componentDidMount() {
    const game = new Game(this.canvasEl, 600, 600);
    game.start();
  }

  render() {
    return <canvas ref={e => this.canvasEl = e}></canvas>;
  }
}

export default Canvas;