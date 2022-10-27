import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

export default function Switch(props) {
  const { state, type, onClick, hideStatus, label, ...other } = props;

  const [onOff, flipOnOff] = useState(state);

  // listen for a change in our props to reflect the off/on state
  useEffect(() => {
    flipOnOff(state);
  }, [state]);

  const clickHandler = (e) => {
    const newState = !onOff;
    if (onClick && typeof onClick == "function") onClick(e, newState);
  };

  const flag = onOff ? "ON" : "OFF";

  return (
    <div className="flex centered pointer">
      <span className="personal-space-right" onClick={clickHandler}>
        {label ? `${label}:` : ""}
      </span>
      <div
        style={{
          width: 20,
          height: 20,
          backgroundColor: onOff ? "currentcolor" : "white",
          border: `solid 1px currentcolor`,
          marginRight: 5,
        }}
        onClick={clickHandler}
        {...other}
      ></div>
      {!hideStatus && <span onClick={clickHandler}>{flag}</span>}
    </div>
  );
}
