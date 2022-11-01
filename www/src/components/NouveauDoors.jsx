import { h, Fragment } from "preact";
import { useState, useRef } from "preact/hooks";
import vector from "../vectors/nouveau-door-v2.js";

import Animator from "./Animator.jsx";
import NumberInput from "../components/NumberInput.jsx";
import Switch from "./Switch.jsx";

let vis = null;
const setVector = (v) => {
  vis = v;
};

export default function Vector(props) {
  const time = 100;
  const step = 1;

  const [options, setOptionsState] = useState({
    height: 0,
    width: 0,
    count: 7,
    offset: 2,
    frequency: 19,
    xAmplitude: 240,
    yAmplitude: 300,
    xMultiplier: 15,
    yMultiplier: 16,
    color: 0,
    thickness: 1,
    widthPercentage: 0.6,
    numbers: [1, 6, 4, 2],
    curve: 0,
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
    "numbers",
    "height",
    "width",
    "period",
    "amplitudeMultiplier",
    "hideProps",
    "widthMultiplier",
    "originalHeight",
    "offset",
    "data",
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
      <Switch
        label="ANIMATE"
        state={isRunning}
        onClick={() => setIsRunning(!isRunning)}
      />
      {controls}
      <Animator
        drawer={vector}
        setVis={setVector}
        options={options}
        time={time}
        intervalCallback={intervalHandler}
      />
    </Fragment>
  );
}
