import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";
import "./style.css";

import FlexRow from "../FlexRow/index.jsx";

export default function Switch(props) {
  const { state, type, onClick, hideLabel, ...other } = props;

  const [onOff, flipOnOff] = useState(state);

  // listen for a change in our props to reflect the off/on state
  useEffect(() => {
    flipOnOff(state);
  }, [state]);

  const clickHandler = (e) => {
    const newState = !onOff;
    onClick && onClick(e, newState);
    flipOnOff(newState);
  };

  const flag = onOff ? <Fragment>ON&nbsp;</Fragment> : "OFF";

  return (
    <FlexRow align="center">
      <div
        className={`button ${onOff ? "on" : "off"}`}
        onClick={clickHandler}
        {...other}
      ></div>
      {!hideLabel && <span onClick={clickHandler}>{flag}</span>}
    </FlexRow>
  );
}
