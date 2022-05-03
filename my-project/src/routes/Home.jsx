import { h } from 'preact'
import { useState, useEffect, useRef } from 'preact/hooks'

export default function Home(props) {
    console.log("HG");
    return (
        <>
            <a href="/">home</a>
            <br />
            <a href="/webart/cartesian">Radial Cartesian</a>
            <br />
            <a href="/webart/oolisp">Oolisp</a>
            <br />
            <a href="/webart/color-plot">Color Plot</a>
            <br />
            <a href="/webart/barcelona-doors">Art Nouveau Doors</a>
            <br />
            <a href="/webart/spectral-circle">Spectral Circle</a>
            <br />
            <a href="/webart/escher">Escher</a>
            <br />
            <a href="/webart/dada">Dada</a>
            <br />
            <a href="/webart/color-study">Color Study</a>
            <br />
            <a href="/webart/fourier">Fourier</a>
            <br />
            <a href="/webart/music">Music</a>
            <br />
            <a href="/webart/aesthetic">Aesthetic</a>
            <br />
            <p>
                A web study is small internet based application that
                demonstrates only a small artistic or technical concept.
            </p>
            <p>
                The ones you find here are built with various tools, some make
                up the framework and others are used to implement the concept
                being studied.
            </p>
            <p>
                For the framework, React is used to manage state and render a
                self made library of reusable components. Webpack is used to
                compile this code into browser preferred javascript.
            </p>
            <p>
                To implement the studies' core concepts, either d3.js or a
                custom web-assembly module is used.
            </p>
        </>
    )
}
