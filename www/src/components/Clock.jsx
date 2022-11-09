import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import clock from "../vectors/clock.js";

import Animator from "./Animator.jsx";
import NumberInput from "./NumberInput.jsx";

let vis;
const setVis = (v) => {
  vis = v;
};

export default function Clock(props) {
  const time = 1000;
  const step = 1;

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
    minuteHandEnd: 73,
    minuteHandThickness: 3,
    secondHandStart: -10,
    secondHandEnd: 92,
    secondHandThickness: 2,
    tickMarksStart: 65,
    tickMarksEnd: 64,
    tickMarksThickness: 1,
    hourTicks: 97,
    logo: "DIGITHEQUE",
    colorPrimary: "#434127",
    colorSecondary: "#ffffff",
    tag: "Quartz - 60hz",
    seconds: new Date().getSeconds(),
    minutes: new Date().getMinutes(),
    hours: new Date().getHours(),
    hideProps: props.hideProps ? props.hideProps : false,
  });

  useEffect(() => intervalHandler, []);

  const intervalHandler = () => {
    setOptionsState((currentOptions) => {
      const date = new Date();
      currentOptions.seconds = date.getSeconds();
      currentOptions.minutes = date.getMinutes();
      currentOptions.hours = date.getHours();
      currentOptions.date = date.toLocaleDateString();
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

  return (
    <Fragment>
      <div className="flex row wrap">{optionsBar}</div>
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
