import { h, Fragment } from "preact";
import { useState, useRef } from "preact/hooks";

import harmonicMotion from "../vectors/harmonic-motion.js";

import Animator from "./Animator.jsx";
import NumberInput from "./NumberInput.jsx";
import Switch from "./Switch.jsx";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function HarmonicMotion(props) {
  const time = 30;
  const step = 1;

  const [options, setOptionsState] = useState({
    height: 0,
    width: 0,
    offset: 0,
    frequency: 2000,
    amplitude: 200,
    thickness: 0.5,
    hideProps: props.hideProps ? props.hideProps : false,
  });

  const [isRunning, setIsRunning] = useState(false);
  const runningRef = useRef();
  runningRef.current = isRunning;
  const intervalHandler = () => {
    if (runningRef.current) {
      setOptionsState((currentOptions) => {
        currentOptions.offset += step;
        vis.setOptions(currentOptions);
        return currentOptions;
      });
    }
  };

  const optionsToSkip = [
    "height",
    "width",
    "numbers",
    "offset",
    "omega",
    "count",
    "originXCircles",
    "originYCircles",
    "originXLine",
    "originYLine",
    "period",
    "amplitudeMultiplier",
    "hideProps",
    "originalHeight",
  ];

  const optionsBar = Object.keys(options)
    .filter((d) => !optionsToSkip.includes(d))
    .map((key) => {
      const value = options[key];
      const handleChange = (value) => {
        const r = value;
        const newOptions = JSON.parse(JSON.stringify(options));
        newOptions[key] = parseFloat(r);
        setOptionsState(newOptions);
        vis.setOptions(newOptions);
      };

      return (
        <div className="personal-space-right">
          <NumberInput value={value} onChange={handleChange} label={key} />
        </div>
      );
    });

  const controls = !props.hideControls && (
    <div className="flex row wrap">{optionsBar}</div>
  );

  return (
    <Fragment>
      <div className={isRunning ? "green" : "red"}>
      <Switch
        label="ANIMATE"
        state={isRunning}
        onClick={() => setIsRunning(!isRunning)}
      />
      </div>
      {controls}
      <Animator
        drawer={harmonicMotion}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={isRunning ? intervalHandler : null}
      />
    </Fragment>
  );
}
