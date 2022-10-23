import { h, Fragment } from "preact";
import entry from "../build/entry.js";

import Button from "../components/Button.jsx";
import Link from "../components/Link.jsx";
import Loader from "../components/Loader.jsx";
import NumberInput from "../components/NumberInput.jsx";
import Swatch from "../components/Swatch.jsx";
import Switch from "../components/Switch.jsx";

function Aesthetic(props) {
  return (
    <Fragment>
      <h1>Aesthetic</h1>
      <h5>A study into the visual motifs used throughout the site.</h5>
      <div className="flex between wrap personal-space-top">
        <div className="fourty-five break-to-full">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at
            sem porttitor, ullamcorper arcu vel, varius ex. Quisque bibendum
            gravida vulputate. Nulla eu nisl volutpat, auctor dolor a, lacinia
            dui. Suspendisse vulputate varius tortor ac ullamcorper. Donec
            aliquam nibh est, in egestas nulla sodales vel. Mauris eget bibendum
            quam. Nunc pellentesque, dui egestas gravida porttitor, lectus ipsum
            commodo arcu, vitae pulvinar nisi ante nec nulla.
          </p>
          <p>
            Proin tincidunt varius mi vitae facilisis. Curabitur lobortis, nisi
            eget semper egestas, libero metus facilisis nulla, a blandit diam
            justo in tellus. Sed in ex eu nulla facilisis elementum. Ut vehicula
            sem justo, vitae efficitur arcu pulvinar et. Curabitur accumsan ex
            at semper gravida. Proin eu arcu viverra, tincidunt mauris a, luctus
            lorem. Nunc eleifend odio eu nisl blandit, eget scelerisque nunc
            molestie. Vivamus risus felis, dapibus dictum mi vitae, rutrum
            sollicitudin dolor. Ut aliquet volutpat tempor.
          </p>
        </div>
        <div className="fourty-five break-to-full">
          <p>
            Vestibulum erat ligula, fermentum in convallis non, sagittis quis
            purus. Duis consequat in nisi sed luctus. Proin at euismod augue.
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
            sagittis ante ipsum, ac ullamcorper ex sollicitudin nec. Mauris
            luctus lectus magna, et feugiat risus congue pretium. Maecenas
            consectetur diam a libero iaculis, vitae egestas purus lobortis.
          </p>
          <p>
            Nulla ac tristique dui. Etiam eget accumsan dui, sagittis mattis
            sapien. Aliquam erat volutpat. Maecenas ut erat justo. Proin
            faucibus sapien et dolor suscipit, non efficitur sem pulvinar. Etiam
            tempus magna consectetur posuere dictum. Mauris ut orci lacinia,
            luctus sapien vitae, tincidunt orci. Sed tempus ipsum magna, a
            lobortis odio egestas vitae. Ut enim orci, laoreet id rhoncus eget,
            blandit ac diam. Nulla fermentum pretium eros, et efficitur felis
            molestie id.
          </p>
        </div>
      </div>
      <h2>This Just In</h2>
      <blockquote>
        Proin tincidunt varius mi vitae facilisis. Curabitur lobortis, nisi eget
        semper egestas, libero metus facilisis nulla, a blandit diam justo in
        tellus. Sed in ex eu nulla facilisis elementum. Ut vehicula sem justo,
        vitae efficitur arcu pulvinar et. Curabitur accumsan ex at semper
        gravida. Proin eu arcu viverra, tincidunt mauris a, luctus lorem. Nunc
        eleifend odio eu nisl blandit, eget scelerisque nunc molestie. Vivamus
        risus felis, dapibus dictum mi vitae, rutrum sollicitudin dolor. Ut
        aliquet volutpat tempor.
      </blockquote>
      <h4>Components</h4>
      <div className="flex around wrap">
        <div>
          <h5>Button</h5>
          <Button>Click Me</Button>
        </div>
        <div>
          <h5>Number Input</h5>
          <NumberInput value={1} onChange={() => {}} />
        </div>
        <div>
          <h5>Link</h5>
          <p>
            <Link href="/">Home</Link>
          </p>
        </div>
        <div>
          <h5>Loader</h5>
          <Loader />
        </div>
        <div>
          <h5>Switch</h5>
          <Switch />
        </div>
      </div>
      <h4>Colors</h4>
      <div className="flex wrap">
        <Swatch color="#7CA2B8" text="black" />
        <Swatch color="#B83035" text="white" />
      </div>
      <br />
    </Fragment>
  );
}

entry(<Aesthetic />);
