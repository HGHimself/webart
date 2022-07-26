import { h } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";
import entry from "../build/entry.js";
import spectralCircle from "../vectors/spectral-circle.js";

import Animator from "../components/Animator/index.jsx";
import Title from "../components/Title/index.jsx";
import Switch from "../components/Switch/index.jsx";

let vis = null;
const setVis = (v) => {
  vis = v;
};

function SpectralCircle(props) {
  const time = 10;
  const step = 5;

  const [running, setRunningState] = useState(false);
  const [offset, setOffsetState] = useState(0);

  const options = {
    numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29],
    height: 600,
    width: 600,
    count: 100,
    offset,
    amplitude: 40,
    frequency: 1 / 1,
    omega: 2 * Math.PI * (1 / 1000),
    multiplierY: 1,
    multiplierX: 1,
  };

  const runningRef = useRef();
  runningRef.current = running;

  const intervalHandler = () => {
    if (!runningRef.current) return;
    setOffsetState(bumpOffset);
  };

  const bumpOffset = (offset) => {
    // here we could mod by sliderMax
    const off = offset + step;
    vis.setOffset(off);
    return off;
  };

  const toggleRunning = () => {
    setRunningState(!running);
  };

  return (
    <div>
      <a href="/webart">back</a>
      <Title title="SPECTRAL CIRCLE" />
      <Switch type={"warning"} state={running} onClick={toggleRunning} />
      <Animator
        drawer={spectralCircle}
        setVis={setVis}
        options={options}
        intervalCallback={intervalHandler}
        time={10}
      />
    </div>
  );
}

entry(<SpectralCircle />);
