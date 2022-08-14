import { h } from "preact";
import entry from "../build/entry.js";

import NouveauDoor from "../components/NouveauDoor.jsx";
import Title from "../components/Title/index.jsx";

function NouveauDoors(props) {

  return (
    <div className="page">
      <NouveauDoor />
      <Title
        title="BARCELONA DOORS"
        description="Gaudí inspired, procedurally generated, art nouveau doors. Experiment with the values!"
      />
    </div>
  );
}

entry(<NouveauDoors />);
