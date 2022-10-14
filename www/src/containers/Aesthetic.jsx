import { h, Fragment } from "preact";
import entry from "../build/entry.js";

import Break from "../components/Break.jsx";
import Button from "../components/Button/index.jsx";
import Link from "../components/Link/index.jsx";
import Loader from "../components/Loader.jsx";
import NumberInput from "../components/NumberInput/index.jsx";
import Swatch from "../components/Swatch.jsx";

function Aesthetic(props) {
  return (
    <Fragment>
      <h1>Aesthetic</h1>
      <h5>
        Formally named Badmon Design System; a study into the visual motifs used
        throughout the site.
      </h5>
      <p>
        The inspiration is to combine emotions from impressionism and romance
        with visual elements from the scientific revolution. A sort of “Walt
        Witman Meets Monet at the Academy of Sciences”.
      </p>
      <h4>Typography</h4>
      <h1>H1 - DIGITHEQUE</h1>
      <h2>H2 - Design &amp; Technology</h2>
      <h3>H3 - Bar Cafe Bistro</h3>
      <h4>H4 - Gnossiennes No. 1</h4>
      <h5>H5 - Ceci n&rsquo;est pas un pipe.</h5>
      <h6>H6 - A liquid that was almost, but not quite, entirely unlike tea</h6>
      <p>Symbols: §¶&amp;™®©…— </p>
      <p>
        Albrecht Dürer, François Truffaut, Plácido Domingo, Ein vergrößertes
      </p>
      <p>1st 2nd 304th</p>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec at sem
        porttitor, ullamcorper arcu vel, varius ex. Quisque bibendum gravida
        vulputate. Nulla eu nisl volutpat, auctor dolor a, lacinia dui.
        Suspendisse vulputate varius tortor ac ullamcorper. Donec aliquam nibh
        est, in egestas nulla sodales vel. Mauris eget bibendum quam. Nunc
        pellentesque, dui egestas gravida porttitor, lectus ipsum commodo arcu,
        vitae pulvinar nisi ante nec nulla.
      </p>
      <p>
        Phasellus ut elit nisi. Vestibulum faucibus leo quis euismod suscipit.
        Integer suscipit, enim vel gravida commodo, ex metus accumsan eros, a
        mollis ex orci et lorem. Fusce in porttitor ipsum, quis commodo lorem.
        Pellentesque eget ante vestibulum, blandit arcu nec, auctor ipsum. Duis
        in aliquet risus. Donec sagittis, eros quis vestibulum tristique, eros
        nunc egestas neque, eu condimentum sapien quam at ipsum. Fusce non massa
        quis nunc auctor sodales ac non augue. Praesent quis nulla faucibus,
        varius nunc at, imperdiet leo.
      </p>
      <p>
        Vestibulum erat ligula, fermentum in convallis non, sagittis quis purus.
        Duis consequat in nisi sed luctus. Proin at euismod augue. Lorem ipsum
        dolor sit amet, consectetur adipiscing elit. Integer sagittis ante
        ipsum, ac ullamcorper ex sollicitudin nec. Mauris luctus lectus magna,
        et feugiat risus congue pretium. Maecenas consectetur diam a libero
        iaculis, vitae egestas purus lobortis.
      </p>
      <p>
        Nulla ac tristique dui. Etiam eget accumsan dui, sagittis mattis sapien.
        Aliquam erat volutpat. Maecenas ut erat justo. Proin faucibus sapien et
        dolor suscipit, non efficitur sem pulvinar. Etiam tempus magna
        consectetur posuere dictum. Mauris ut orci lacinia, luctus sapien vitae,
        tincidunt orci. Sed tempus ipsum magna, a lobortis odio egestas vitae.
        Ut enim orci, laoreet id rhoncus eget, blandit ac diam. Nulla fermentum
        pretium eros, et efficitur felis molestie id.
      </p>
      <p>
        Sed egestas cursus lectus posuere dignissim. Duis ut sodales neque. Cras
        eget risus pulvinar nibh viverra fringilla vitae vitae libero. Sed non
        velit nec est aliquet ultrices sit amet non est. Quisque fringilla
        rhoncus euismod. Aenean in lacus nec metus fermentum hendrerit. Donec
        sed consectetur tortor. Suspendisse tincidunt suscipit urna, at
        facilisis erat semper vel. Phasellus maximus, ipsum eget lobortis
        fermentum, ipsum enim bibendum velit, vel ultricies nunc orci in nunc.
        Integer congue elit odio, vitae consequat metus vehicula sed.
        Pellentesque convallis, risus vitae volutpat egestas, lacus nisi
        volutpat dolor, et facilisis ipsum ante at sapien. Etiam scelerisque,
        massa sit amet rhoncus fermentum, turpis est vulputate arcu, id cursus
        lacus lectus ac felis. Praesent efficitur finibus mi, dapibus congue mi.
        Cras ut libero eget metus vulputate cursus non a diam.
      </p>
      <p>
        Proin tincidunt varius mi vitae facilisis. Curabitur lobortis, nisi eget
        semper egestas, libero metus facilisis nulla, a blandit diam justo in
        tellus. Sed in ex eu nulla facilisis elementum. Ut vehicula sem justo,
        vitae efficitur arcu pulvinar et. Curabitur accumsan ex at semper
        gravida. Proin eu arcu viverra, tincidunt mauris a, luctus lorem. Nunc
        eleifend odio eu nisl blandit, eget scelerisque nunc molestie. Vivamus
        risus felis, dapibus dictum mi vitae, rutrum sollicitudin dolor. Ut
        aliquet volutpat tempor.
      </p>
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
      <h4>Colors</h4>
      <div className="flex wrap">
        <Swatch color="#7CA2B8" text="black" />
        <Swatch color="#B83035" text="white" />
        <Swatch color="#B8B542" text="black" />
      </div>
      <br />
    </Fragment>
  );
}

entry(<Aesthetic />);
