import { h, Fragment } from "preact";
import { useEffect, useState } from "preact/hooks";

import FlexRow from "./FlexRow/index.jsx";

const height = 16;
const width = 32;

const upArrowPoints = `${width / 2},1 1,${height} ${width - 1},${height}`;
const downArrowPoints = `1,0 ${width - 1},0 ${width / 2},${height - 1}`;

export default function NumberInput(props) {
  const { onChange, value, label, ...other } = props;

  const [v, setValueState] = useState(value);

  useEffect(() => {
    setValueState(value);
  }, [value]);

  const handleInput = (e) => {
    setValueState(parseFloat(e.target.value));
    onChange(e.target.value);
  };

  const handleIncrease = () => {
    setValueState(v + 1);
    onChange(v + 1);
  };

  const handleDecrease = () => {
    setValueState(v - 1);
    onChange(v - 1);
  };

  return (
    <Fragment>
      <FlexRow direction="column" align="center">
        <label>{label}</label>
        <button onClick={handleIncrease} className="emptyButton">
          <svg class="arrow" height={height} width={width}>
            <polygon points={upArrowPoints} style={{ strokeWidth: 1, stroke: "currentcolor" }} />
          </svg>
        </button>
        <input id={label} type="number" value={v} onChange={handleInput} />
        <button onClick={handleDecrease} className="emptyButton">
          <svg class="arrow" height={height} width={width}>
            <polygon points={downArrowPoints} style={{ strokeWidth: 1, stroke: "currentcolor" }} />
          </svg>
        </button>
      </FlexRow>
    </Fragment>
  );
}
