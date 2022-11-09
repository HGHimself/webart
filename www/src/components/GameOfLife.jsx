import { h, Fragment } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";

import { Rps, RpsCell } from "cellular-automata";
import { memory } from "cellular-automata/cellular_automata_bg.wasm";
import game_of_life from "../vectors/game-of-life.js";

import Animator from "./Animator.jsx";
import NumberInput from "./NumberInput.jsx";
import Switch from "./Switch.jsx";

const universe = Rps.new(80, 80);
const width = universe.width();
const height = universe.height();

let vis = null;
const setVis = (v) => {
  vis = v;
};

export default function GameOfLife(props) {
  const time = 200;
  const [options, setOptions] = useState({
    height: 800,
    width: 800,
    w: width,
    h: height,
    data: Array.from({ length: 80 * 80 }, (_) => 0),
    size: 10,
  });
  const [isRunning, setIsRunning] = useState(false);

  const runningRef = useRef();
  runningRef.current = isRunning;
  const intervalHandler = () => {
    if (runningRef.current) {
      const cellsPtr = universe.cells();
      const cells = new Uint8Array(memory.buffer, cellsPtr, width * height);
      setOptions((currentOptions) => {
        currentOptions.data = cells;
        vis.setOptions(currentOptions);
        return currentOptions;
      });
      universe.tick();
    }
  };

  return (
    <Fragment>
      <div className={isRunning ? "green" : "red"}>
        <Switch
          label="ANIMATE"
          state={isRunning}
          onClick={() => setIsRunning(!isRunning)}
        />
      </div>
      <Animator
        drawer={game_of_life}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={isRunning ? intervalHandler : null}
      />
    </Fragment>
  );
}
