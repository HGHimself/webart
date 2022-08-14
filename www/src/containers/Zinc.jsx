import { h } from "preact";
import entry from "../build/entry.js";

import Zinc from "../components/Zinc.jsx";
import Title from "../components/Title/index.jsx";

function ZincContainer(props) {
  return (
    <div className="page">
      <Zinc />
      <Title
        title="ZINC"
        description="Just an exploration for now!"
      />
    </div>
  );
}

entry(<ZincContainer />);
