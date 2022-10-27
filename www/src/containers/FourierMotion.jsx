import { h, Fragment } from "preact";
import entry from "../build/entry.js";

import FourierMotion from "../components/FourierMotion.jsx";
import Title from "../components/Title.jsx";

function Fourier(props) {
  return (
    <Fragment>
      <FourierMotion />
      <Title
        title="FOURIER MOTION"
        description="Use a series of circles to draw irregular lines!"
      />
    </Fragment>
  );
}

entry(<Fourier />);
