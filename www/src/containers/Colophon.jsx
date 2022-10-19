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
        <Link href="https://webpack.js.org/">webpack</Link>.
      </p>
    </Fragment>
  );
}

entry(<Colophon />);
