import { h, Fragment } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

let vis = null;
const resizeDelay = 300;

export default function Animator(props) {
  const {
    drawer,
    options,
    setVis,
    intervalCallback,
    time,
    disableResize,
    ...other
  } = props;

  const [width, setWidth] = useState(options.width || 600);
  const [height, setHeight] = useState(options.height || 500);

  const refElement = useRef(null);

  const initVis = () => {
    options.width = width;
    options.height = height;
    const v = new drawer(refElement.current, options);
    setVis(v);
    vis = v;
  };

  const updateVisOnResize = () => {
    vis && vis.resize && vis.resize(width, height);
  };

  const getDimensions = () => {
    const w = refElement.current.clientWidth; //window.innerWidth;
    const h = refElement.current.clientHeight; //window.innerHeight;
    setWidth(w);
    setHeight(h);
  };

  const handleResizeEvent = () => {
    if (disableResize) {
      return;
    }

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(getDimensions, resizeDelay);
    };
    window.addEventListener("resize", handleResize);
    getDimensions();
    return () => window.removeEventListener("resize", handleResize);
  };

  const setupTimer = () => {
    if (!intervalCallback) {
      return;
    }

    const interval = setInterval(intervalCallback, time);
    return () => clearInterval(interval);
  };

  useEffect(initVis, []);
  useEffect(setupTimer, [intervalCallback]);
  useEffect(handleResizeEvent, []);
  useEffect(updateVisOnResize, [width, height]);

  return (
    <Fragment>
      <div ref={refElement} {...other} />
    </Fragment>
  );
}
