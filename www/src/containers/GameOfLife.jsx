import { h, Fragment } from "preact";
import entry from "../build/entry.js";

import { default as Vector } from "../components/GameOfLife.jsx";
import Title from "../components/Title.jsx";

function GameOfLife(props) {
  return (
    <Fragment>
      <Vector />
      <Title
        title="GAME OF LIFE"
        description="Use a series of circles to draw irregular lines!"
      />
    </Fragment>
  );
}

entry(<GameOfLife />);
