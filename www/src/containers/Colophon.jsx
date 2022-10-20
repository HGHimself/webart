import { h, Fragment } from "preact";
import entry from "../build/entry.js";
import Link from "../components/Link.jsx";

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
      <p>
        The Vector Engine that powers most studies was developed by HG King.
      </p>
    </Fragment>
  );
}

entry(<Colophon />);
