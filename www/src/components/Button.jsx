import { h, Fragment } from "preact";
import { useState, useEffect, useRef } from "preact/hooks";

export default function Button(props) {
  const { onClick, ...other } = props;

  const [turbulence, setTurbulence] = useState(0);
  const [uniqueId, setUniqueId] = useState(0);

  // so our effect is local to one button and not all buttons
  useEffect(() => setUniqueId(Math.random()), []);
  const filterName = `noise-${uniqueId}`;

  const turbulenceRef = useRef();
  turbulenceRef.current = turbulence;

  const staticAnimation = (to, step, frames) => {
    const totalTime =
      Math.abs((to - turbulenceRef.current) / Math.abs(step)) * frames;

    let interval = setInterval(() => {
      setTurbulence((turbulence) => turbulence + step);
    }, frames);

    return new Promise((resolve) =>
      setTimeout(() => {
        clearInterval(interval);
        setTurbulence(to);
        resolve();
      }, totalTime)
    );
  };

  const animate = () => {
    // increase turbulence, then decrease turbulence
    staticAnimation(20, 3, 10).then(() => staticAnimation(0, -3, 10));
  };

  const handleClick = () => {
    if (onClick && typeof onClick == "function") onClick();
    animate();
  };

  return (
    <Fragment>
      <svg style="height: 0px; width: 0px;">
        <filter id={filterName}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency={`0 ${turbulence / 100}`}
            result="NOISE"
            numOctaves="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="NOISE"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="R"
          ></feDisplacementMap>
        </filter>
      </svg>
      <button
        style={`filter: url(#${filterName});`}
        onClick={handleClick}
        {...other}
      >
        {props.children}
      </button>
    </Fragment>
  );
}
