import { h, Fragment } from "preact";
import entry from "../build/entry.js";

import Link from "../components/Link.jsx";
import Cartesian from "../components/Cartesian.jsx";

function Colophon(props) {
  return (
    <Fragment>
      <h1>Colophon</h1>
      <p>
        This website was designed and programmed by HG King in 2022, using{" "}
        <Link href="https://preactjs.com/">preactjs</Link> and{" "}
        <Link href="https://d3js.org/">d3js</Link>. Compiled using{" "}
        <Link href="https://webpack.js.org/">webpack</Link>. All rights are
        reserved; Digitheque ©2022.
      </p>
      <div className="">
        <div>
          <h2>Radial Cartesian</h2>
          <p>Use simple harmonic motion to form ratio patterns. </p>
        </div>
        <Cartesian
          disableResize
          options={{
            height: 200,
            width: 200,
            count: 1000,
            offset: 0,
            frequency: 6,
            xAmplitude: 140,
            yAmplitude: 140,
            yMultiplier: 4,
            xMultiplier: 5,
            color: 10,
            thickness: 1,
            hideProps: true,
          }}
        />
      </div>
    </Fragment>
  );
}

entry(<Colophon />);
