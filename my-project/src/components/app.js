import { h } from 'preact';
import { Router } from 'preact-router';

// Code-splitting is automated for `routes` directory
import Aesthetic from '../routes/Aesthetic.jsx'
import Cartesian from '../routes/Cartesian'
import ColorPlot from '../routes/ColorPlot.jsx'
import ColorStudy from '../routes/ColorStudy.jsx'
import Dada from '../routes/Dada.jsx'
import Escher from '../routes/Escher.jsx'
import Fourier from '../routes/Fourier.jsx'
import Game from '../routes/Game.jsx'
import Home from '../routes/Home.jsx'
import MusicBox from '../routes/MusicBox.jsx'
import Oolisp from '../routes/Oolisp.jsx'
import SpectralCircle from '../routes/SpectralCircle.jsx'
import Vector from '../routes/Vector'

const App = () => {
	console.log("HG");
	return (
	<div id="app">
		<Router>
			<Home path="/webart" />
			<Cartesian path="/webart/cartesian/" />
			<Aesthetic path="/webart/aesthetic" />
			<ColorPlot path="/webart/color-plot" />
			<ColorStudy path="/webart/color-study" />
			<Dada path="/webart/dada" />
			<Escher path="/webart/escher" />
			<Fourier path="/webart/fourier" />
			<Game path="/webart/game" />
			<MusicBox path="/webart/music-box" />
			<Oolisp path="/webart/oolisp" />
			<SpectralCircle path="/webart/spectral-circle" />
			<Vector path="/webart/barcelona-doors" />
		</Router>
	</div>
)}

export default App;
