import { h } from "preact";
import entry from "../build/entry.js";
import Cartesian from "../components/Cartesian.jsx";
import Circular from "../components/Circular.jsx";
import HarmonicMotion from "../components/HarmonicMotion.jsx";

function Descartes(props) {
  return (
    <div>
      <h2>Descartes</h2>
      <h5>A study into producing feedback loops in a simple system.</h5>
      <p>
        We do this with a handful of small interactive web-studies that will let
        you alter parameters that feed into a very basic set of equations and
        graphs out lines onto your screen. A core principle we investigate is
        how we can get these equations to overlap in either harmony or
        dissonance.
      </p>
      <h6>
        Hint: Use the small 'up' and 'down' arrows to alter the parameters!
      </h6>
      <br />
      <h4>Simple Harmonic Motion</h4>
      <p>Formal definition:</p>
      <blockquote>
        In mechanics and physics, simple harmonic motion (sometimes abbreviated
        SHM) is a special type of periodic motion where the restoring force on
        the moving object is directly proportional to the magnitude of the
        object's displacement and acts towards the object's equilibrium
        position. It results in an oscillation which continues indefinitely, if
        uninhibited by friction or any other dissipation of energy. -{" "}
        <a href="https://en.wikipedia.org/wiki/Simple_harmonic_motion">
          Wikipedia
        </a>
      </blockquote>
      <p>
        We are using simple harmonic motion here in our web-studies as the
        driving principle. It is the system that we are going to be working
        within. Let us quickly explain what SHM is in laymans' terms:
      </p>
      <p>
        Simple Harmonic Motion is essentially using 'waves' to represent or
        describe oscillating motion. Think of jello jiggling or an oscillating
        fan. The type of SHM we use is described by this formula:
      </p>
      <blockquote>
        <code>y = 𝑓(t) = O + A * sin(t * f * 2pi)</code>
      </blockquote>
      <p>
        Where <code>O</code> is the originating position, <code>A</code> is the
        amplitude of the wave, <code>t</code> is the time or offset,
        <code>f</code> is the frequency, and <code>pi</code> is everyone's
        favorite number. It means that a position on a graph (here the y axis)
        can be determined at any given time. To find out what the position
        should be, you fill in all the variables in the equation above and
        evaluate it.
      </p>
      <HarmonicMotion numbers={[1]} hideProps />
      <h6>Fig. 1 - Simple Harmonic Motion</h6>
      <p>
        This small demonstration shows you how each variable affects the wave
        that is produced by the equation.
      </p>
      <p>
        Some variables we take care of for you in order to keep the animation in
        the right place. These are the <code>Origin</code> and <code>time</code>
        . The time is incemented and flows in the direction time often tends to
        flow. The origin is just to the left of center.
      </p>
      <p>
        <code>Amplitude</code> and <code>Frequency</code> are up to you to alter
        to your heart's desire. The amplitude will affect how big the wave goes
        up and down. The frequency is how fast the wave goes around the circle.
      </p>
      <p>
        The important concept to get out of this is that there is a loop. The{" "}
        <code>sin</code> function here powers Simple Harmonic Motion, it allows
        the line to go back and forth in a looping or repeating process. Let's
        see how we can take advantage of this fact.
      </p>
      <h4>Multipliers</h4>
      <p>
        Now that we have our first loop, we can try and include more. A good
        start is to use the 2nd dimension we are all familiar with. This next
        web-study does that exactly. We introduce multipliers to see how the
        frequency ratios between the x and y axis can produce neat patterns.
        Here is our math:
      </p>
      <blockquote>
        <code>x = 𝑓(t) = Ax * sin(t * f * Mx * 2pi)</code>
        <br />
        <code>y = 𝑓(t) = Ay * cos(t * f * My * 2pi)</code>
      </blockquote>
      <p>
        The letters here are all the same as above, except for the M's which
        correspond to the multipliers. When the multipliers for x and y are
        equal, you will get a circle. This is because the sine and cosine waves
        both go 'up and down' exactly once. When the multipliers are different,
        they form a ratio of 'up and down's. This is giving us harmony and
        dissonance between our two loops.
      </p>
      <p>Play around with the numbers and see what you can make!</p>
      <Cartesian hideProps />
      <h6>Fig. 2 - Radial Cartesian</h6>
      <p>
        You may notice that after altering the frequency parameter, we start to
        get crazy shapes. At a frequency of 1, you will see the true path of the
        lines, where each line segment is inline 'main line'. When you increase
        it to 2, you will see that the line segments will start to get out of
        order, and cross to other sections of the 'main line'. That is the loops
        feeding back into eachother; you see interesting patterns because the
        feedback starts to form patterns. As you continue to increase, the lines
        eventually begin to follow the true path once again.
      </p>
      <h4>Taking It Further</h4>
      <p>
        Now, why stop there, we can add another loop. What if we used circles
        instead of lines, and we base the radius of these circles on SMH.
      </p>
      <p>
        That is definitely something we can do. This next example allows you to
        control even more parameters. The math is as follows:
      </p>
      <blockquote>
        <code>x = 𝑓(t) = Ax * sin(t * f * Mx * 2pi)</code>
        <br />
        <code>y = 𝑓(t) = Ay * cos(t * f * My * 2pi)</code>
        <br />
        <code>r = 𝑓(t) = Ar * sin(t * Mr * 2pi)</code>
      </blockquote>
      <p>
        We also provide controls to the colors so that you can make some really
        funky sketches (yet another loop).
      </p>
      <Circular hideProps />
      <h6>Fig. 3 - Circular Cartesian</h6>
      <br />
      <h4>Conclusion</h4>
      <p>
        This was a study into using a basic system like simple harmonic motion
        to draw sketches with the intention of producing patterns through
        feedback loops.
      </p>
    </div>
  );
}

entry(<Descartes />);
