import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import clock from "../vectors/clock.js";

import Animator from "./Animator.jsx";
import NumberInput from "./NumberInput.jsx";
import Button from "./Button.jsx";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function Clock(props) {
  const time = 1000;
  const step = 1;

  const [showOptions, setShowOptions] = useState(true);
  const [options, setOptionsState] = useState({
    height: 500,
    width: 500,
    hourNumbersSize: 80,
    speckCircleSize: 5,
    numbersRadius: 73,
    hourHandStart: -4,
    hourHandEnd: 50,
    hourHandThickness: 5,
    minuteHandStart: -7,
    minuteHandEnd: 69,
    minuteHandThickness: 3,
    secondHandStart: -10,
    secondHandEnd: 81,
    secondHandThickness: 2,
    tickMarksStart: 66,
    tickMarksEnd: 63,
    tickMarksThickness: 1,
    hourTicks: 97,
    logo: "DIGITHEQUE",
    colorPrimary: "#434127",
    colorSecondary: "#ffffff",
    tag: "Quartz - 60hz",
    seconds: new Date().getSeconds(),
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    date: new Date().toLocaleString().split(", "),
    hideProps: props.hideProps ? props.hideProps : false,
  });

  const intervalHandler = () => {
    setOptionsState((currentOptions) => {
      const date = new Date();
      currentOptions.seconds = date.getSeconds();
      currentOptions.minutes = date.getMinutes();
      currentOptions.hours = date.getHours();
      currentOptions.date = date.toLocaleString().split(", ");
      vis.setOptions(currentOptions);
      return currentOptions;
    });
  };

  const optionsToSkip = [
    "height",
    "width",
    "amplitudeMultiplier",
    "originX",
    "originY",
    "radius",
    "hideProps",
    "seconds",
    "minutes",
    "hours",
    "logo",
    "ticks",
    "hourNumbers",
    "colorPrimary",
    "colorSecondary",
    "tag",
    "date",
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
        <div className="personal-space-left">
          <NumberInput value={value} onChange={handleChange} label={key} />
        </div>
      );
    });

  return (
    <Fragment>
      <div className="flex wrap centered-items options-bar">
        <Button onClick={() => setShowOptions(!showOptions)}>
          {showOptions ? "Hide" : "Show"} Options
        </Button>
        {showOptions && optionsBar}
      </div>
      <Animator
        drawer={clock}
        setVis={setVis}
        options={options}
        time={time}
        intervalCallback={intervalHandler}
      />
    </Fragment>
  );
}
