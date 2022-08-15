import { h, Fragment } from "preact";
import entry from "../build/entry.js";

import Zinc from "../components/Zinc.jsx";
import Title from "../components/Title/index.jsx";

function ZincContainer(props) {
  return (
    <Fragment>
      <Zinc />
      <Title
        title="ZINC"
        description="Overriding backgrounds with generated ethereal svgs!"
      />
    </Fragment>
  );
}

entry(<ZincContainer />);
