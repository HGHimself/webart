import { h, Fragment } from "preact";
import { useState, useRef } from "preact/hooks";

export default function Button(props) {
  const { type, ...other } = props;

  const [turbulence, setTurbulence] = useState(0);
  const [locked, setLocked] = useState(false);

  const turbulenceRef = useRef();
  turbulenceRef.current = turbulence;

  const staticAnimation = (to, step, frames, end) => {
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
    // if (!locked) {
    // setLocked(true);
    staticAnimation(20, 3, 10).then(() =>
      staticAnimation(0, -3, 10).then(() => setLocked(false))
    );
    // }
  };

  return (
    <Fragment>
      <svg style="height: 0px; width: 0px;">
        <filter id="noise">
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
      <button className="button" onClick={animate}>
        {props.children}
      </button>
    </Fragment>
  );
}
