import { h, Fragment } from "preact";
import entry from "../build/entry.js";

import Break from "../components/Break.jsx";
import Button from "../components/Button/index.jsx";
import Link from "../components/Link/index.jsx";
import Loader from "../components/Loader.jsx";
import NumberInput from "../components/NumberInput/index.jsx";
import Zinc from "../components/Zinc.jsx";

function Aesthetic(props) {
  return (
    <Fragment>
      <h2>Aesthetic</h2>
      <h5>
        Formally named Badmon Design System; a study into the visual motifs used
        throughout the site.
      </h5>
      <p>
        The inspiration is to combine emotions from impressionism and romance
        with visual elements from the scientific revolution. A sort of "Walt
        Witman Meets Monet at the Academy of Sciences".
      </p>
      <Break />
      <h4>Typography</h4>
      <p>
        Generally all typography decisions are following the guidelines laid out
        by{" "}
        <Link href="https://material.io/design/typography/the-type-system.html#type-scale">
          Material Design
        </Link>
      </p>
      <br />
      <h5>The headings are set in a serif font.</h5>
      <h1>H1 - DIGITHEQUE</h1>
      <h2>H2 - Design &amp; Technology</h2>
      <h3>H3 - Bar Cafe Bistro</h3>
      <h4>H4 - Gnossiennes No. 1</h4>
      <h5>H5 - Ceci n'est pas un pipe.</h5>
      <h6>H6 - A liquid that was almost, but not quite, entirely unlike tea</h6>
      <br />
      <h5>Paragraphs are set in a sans-serif font.</h5>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce rhoncus
        nunc odio, in vulputate ipsum placerat ut. Aliquam pretium dui in augue
        dignissim congue. Maecenas venenatis, augue eu dictum eleifend, lorem
        ipsum vehicula elit, vel condimentum lorem turpis eu magna. Aenean a
        hendrerit risus. Sed sed metus at augue pharetra ornare. Morbi commodo,
        dui ac tincidunt feugiat, nunc odio dapibus massa, id convallis justo
        lacus consequat dui. Quisque ac nisl imperdiet, auctor magna a, congue
        leo.
      </p>
      <Break />
      <h4>Components</h4>
      <div className="flex around wrap">
        <div className="text-center">
          <h5>Button</h5>
          <Button>Click Me</Button>
        </div>
        <div className="text-center">
          <h5>Number Input</h5>
          <NumberInput value={1} onChange={() => {}} />
        </div>
        <div className="text-center">
          <h5>Link</h5>
          <p>
            <Link href="/">Home</Link>
          </p>
        </div>
        <div className="text-center">
          <h5>Loader</h5>
          <Loader />
        </div>
      </div>
      <Zinc hideControls random hideProps />
    </Fragment>
  );
}

entry(<Aesthetic />);
