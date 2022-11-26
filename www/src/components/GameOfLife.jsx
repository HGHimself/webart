import { h, Fragment } from "preact";
import { useEffect, useState, useRef } from "preact/hooks";

import { Gol, GolCell } from "cellular-automata";
import { memory } from "cellular-automata/cellular_automata_bg.wasm";
import game_of_life from "../vectors/game-of-life.js";

import Animator from "./Animator.jsx";
import Button from "./Button.jsx";
import NumberInput from "./NumberInput.jsx";

const universe = Gol.new(64, 64);
const width = universe.width();
const height = universe.height();

let vis = null;
const setVis = (v) => {
  vis = v;
};

export default function GameOfLife(props) {
  const time = 150;
  const [options, setOptions] = useState({
    height: 640,
    width: 640,
    w: width,
    h: height,
    data: Array.from({ length: 64 * 64 }, (_) => 0),
    size: 10,
    hideProps: true,
    set: (i) => {
      universe.set(i);
      // airplane(i)
      load();
    },
  });
  const [number, setNumber] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const toggleRun = () => setIsRunning((r) => !r);

  const runningRef = useRef();
  runningRef.current = isRunning;

  const load = () => {
    const cells = new Uint8Array(
      memory.buffer,
      universe.cells(),
      width * height
    );
    setOptions((currentOptions) => {
      currentOptions.data = cells;
      vis.setOptions(currentOptions);
      return currentOptions;
    });
  };

  const step = () => {
    universe.tick();
    load();
  };

  useEffect(() => {
    load();
  }, []);

  const clear = () => {
    for (let i = 0; i < width * height; i++) {
      universe.set(i);
    }
    load();
  };

  const intervalHandler = () => {
    if (runningRef.current) {
      step();
    }
  };

  const add = () => {
    airplanePlane(parseInt(number));
    load();
  };

  const airplane = (center) => {
    universe.set(center - 1);
    universe.set(center + width);
    universe.set(center - width - 1);
    universe.set(center - width);
    universe.set(center - width + 1);
  };

  const airplaneRow = (center) => {
    for (let i = 0; i < width - 6; i += 5) {
      airplane(center + i);
    }
  };

  const airplanePlane = (center) => {
    for (let i = 0; i < height - 1; i += 4) {
      airplaneRow(center + height * i);
    }
  };

  const line = () => {
    for (let i = 0; i < height; i++) {
      universe.set(i * 64 + 32);
    }
    for (let i = 0; i < width; i++) {
      universe.set(i + 64 * 32);
    }

    // for (let i = 0; i < height; i++) {
    //   universe.set(i * 64);
    // }
    // for (let i = 0; i < width; i++) {
    //   universe.set(i);
    // }
    load();
  };

  const random = () => {
    universe.random();
    load();
  };

  return (
    <Fragment>
      <Button className="personal-margin-left" onClick={toggleRun}>
        {isRunning ? "Stop" : "Run"}
      </Button>
      <Button className="personal-margin-left" onClick={step}>
        Step
      </Button>
      <Button className="personal-margin-left" onClick={clear}>
        Nuke
      </Button>
      <Button className="personal-margin-left" onClick={random}>
        Random
      </Button>
      <Button className="personal-margin-left" onClick={line}>
        line
      </Button>
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
