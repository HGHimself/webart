import { h } from "preact";
import { useState, useEffect } from "preact/hooks";

const intervalFrameRate = 300;

export default function Loader(props) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((count) => count + 1);
    }, intervalFrameRate);

    return () => clearInterval(interval);
  }, []);

  const trailingPeriods = Array.from({ length: count % 4 }, (_, i) => i)
    .map((x) => ".")
    .join("");

  return (
    <div style="width: 9.5rem;" className="text-left">
      <h3>Loading{trailingPeriods}</h3>
    </div>
  );
}
