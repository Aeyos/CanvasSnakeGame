import React from "react";
import { render } from "react-dom";
import Canvas from "./canvas";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <h1>
      Canvas{" "}
      <span role="img" aria-label="snake">
        🐍
      </span>{" "}
      Game
    </h1>
    <Canvas />
  </div>
);

render(<App />, document.getElementById("root"));
