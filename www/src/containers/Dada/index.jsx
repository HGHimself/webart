import { h, Fragment } from "preact";
import { useState } from "preact/hooks";
import "./style.css";
import entry from "../../build/entry.js";
import * as dada from "dada-poem-generator";

import FlexRow from "../../components/FlexRow/index.jsx";
import Title from "../../components/Title/index.jsx";

const defaultMessage = `TO MAKE A DADAIST POEM
Take a newspaper.
Take some scissors.
Choose from this paper an article of the length you want to make your poem.
Cut out the article.
Next carefully cut out each of the words that makes up this article and put them all in a bag.
Shake gently.
Next take out each cutting one after the other.
Copy conscientiously in the order in which they left the bag.
The poem will resemble you.
And there you are - an infinitely original author of charming sensibility, even though unappreciated by the vulgar herd.`;

function Dada(props) {
  const [input, setInput] = useState(defaultMessage);

  const handleInput = ({ target }) => {
    setInput(target.value);
  };

  return (
    <Fragment>
      <FlexRow flex="flex">
        <div className="dada-input">
          <textarea onInput={handleInput} value={input} />
        </div>
        <div className="dada-display">
          <pre>{dada.dada(input)}</pre>
        </div>
      </FlexRow>
      <Title
        title="DADA"
        description="Express your own irrationality! Enter words into the box on the left; see the output on the right."
      />
    </Fragment>
  );
}

entry(<Dada />);
