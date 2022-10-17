import { Fragment, h } from "preact";
import entry from "../build/entry.js";

import { default as Vector } from "../components/Clock.jsx";
import Title from "../components/Title.jsx";

function Clock() {
  return (
    <Fragment>
      <Vector hideProps />
      <Title title="CLOCK" description="Keep time!" />
    </Fragment>
  );
}

entry(<Clock />);
