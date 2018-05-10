import React from "react";
import { render } from "react-dom";
import Hello from "./Hello";
import Canvas from "./UI/canvas";

const styles = {
  fontFamily: "sans-serif",
  textAlign: "center"
};

const App = () => (
  <div style={styles}>
    <Hello name="CodeSandbox" />
    <h2>Start editing to {"\u2728"}</h2>
    <Canvas />
  </div>
);

render(<App />, document.getElementById("root"));
