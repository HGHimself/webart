import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

let vis = null;
const resizeDelay = 300;

export default function Animator(props) {
  const { drawer, options, setVis, intervalCallback, time, ...other } = props;

  const [width, setWidth] = useState(window.innerWidth || 600);
  const [height, setHeight] = useState(options.height || 600);

  const refElement = useRef(null);

  const initVis = () => {
    const v = new drawer(refElement.current, options);
    setVis(v);
    vis = v;
  };

  const updateVisOnResize = () => {
    vis && vis.resize && vis.resize(width, height);
  };

  const handleResizeEvent = () => {
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function () {
        const w = window.innerWidth;
        const h = window.innerHeight;
        setWidth(w);
        setHeight(h);
      }, resizeDelay);
    };
    window.addEventListener("resize", handleResize);

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
  useEffect(setupTimer, []);
  useEffect(handleResizeEvent, []);
  useEffect(updateVisOnResize, [width, height]);

  return <div className="animator" ref={refElement} {...other} />;
}
