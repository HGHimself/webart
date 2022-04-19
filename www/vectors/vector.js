// save in vectors/vector.js
import * as d3 from 'd3'
import {
    degreesToRadians,
    polarToCartesian,
    fourier,
    squareWaveSequenceSin,
    squareWaveSequenceCos,
    distance,
} from '../utils/maths-tools.js'
import theme from '../theme'
import { getSpectrumPosition } from '../utils/color-tools.js'

class Vector {
    constructor(containerEl, props) {
        this.containerEl = containerEl
        this.props = props
        const { width, height, count, background } = props

        const data = Array.from({ length: count }, (_, i) => i)

        this.svg = d3
            .select(containerEl)
            .append('svg')
            .attr('width', width * 2)
            .attr('height', height)
        this.svg
            .append('defs')
            .append('filter')
            .attr('id', 'tint')
            .append('feColorMatrix')
            .attr('values', '1.1 0 0 0 0  0 1.1 0 0 0  0 0 0.9 0 0  0 0 0 1 0')
        this.svg
            .select('defs')
            .append('filter')
            .attr('id', 'splotch')
            .append('feTurbulence')
            .attr('type', 'fractalNoise')
            .attr('baseFrequency', '0.01')
            .attr('numOctaves', '4')
        this.svg
            .select('defs')
            .select('filter#splotch')
            .append('feColorMatrix')
            .attr('values', '0 0 0 0 0, 0 0 0 0 0, 0 0 0 0 0, 0 0 0 -0.9 1.2')
            .attr('result', 'texture')
        this.svg
            .select('defs')
            .select('filter#splotch')
            .append('feComposite')
            .attr('in', 'SourceGraphic')
            .attr('in2', 'texture')
            .attr('operator', 'in')
        this.svg
            .select('defs')
            .select('filter#splotch')
            .append('feGaussianBlur')
            .attr('stdDeviation', '0.7')
        this.svg
            .select('defs')
            .append('filter')
            .attr('id', 'pencil')
            .append('feTurbulence')
            .attr('type', 'fractalNoise')
            .attr('baseFrequency', '.01')
            .attr('numOctaves', '4')
        this.svg
            .select('defs')
            .select('filter#pencil')
            .append('feTurbulence')
            .attr('baseFrequency', '0.03')
            .attr('type', 'fractalNoise')
            .attr('numOctaves', '2')
        this.svg
            .select('defs')
            .select('filter#pencil')
            .append('feDisplacementMap')
            .attr('in', 'SourceGraphic')
            .attr('scale', '1')
            .attr('xChannelSelector', 'R')
            .attr('yChannelSelector', 'G')
        this.svg
            .select('defs')
            .select('filter#pencil')
            .append('feGaussianBlur')
            .attr('stdDeviation', '0.6')
        this.svg
            .append('g')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'left')
        this.svg
            .append('g')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'right')
            .attr('transform', `translate(${width * 2},0) scale(-1,1)`)

        this.classes = ['left', 'right']

        const pad = 6
        const box = [
            [pad, 0],
            [width - 0, pad],
            [width - pad, height - 0],
            [0, height - pad],
            [pad, 0],
            [0, pad],
            [width - pad, 0],
            [width - 0, height - pad],
            [pad, height - 0],
            [0, pad],
        ]

        this.classes.forEach((c) => {
            this.svg
                .select(`g.${c}`)
                .append('g')
                .append('path')
                .attr('class', 'outline')
                .attr('d', d3.line().curve(d3['curveMonotoneX'])(box))
                .attr('stroke-width', '4')
                .attr('fill', getSpectrumPosition(this.props.spectrum))
                // .attr("stroke", theme.colors.black)
                .attr('filter', 'url(#splotch)')
            // svg.selectAll('ellipse')
            //   .data([0])
            //   .enter()
            //     .append("ellipse")
            //     .attr("rx", 100)
            //     .attr("ry", 200)
            //     .attr("cx", width / 2)
            //     .attr("cy", height / 2)
            //     .attr("fill", "#8b9b8a")
            // .attr("stroke-width", "3")
            this.svg
                .select(`g.${c}`)
                .append('g')
                .attr('class', 'mesh')
                .attr('filter', 'url(#pencil)')
                .selectAll('path.door') // you can draw other paths if you use classes
                .data(data)
                .enter()
                .append('path')
                .attr('class', 'door') // classes help you be specific and add more drawings
                .attr('fill', 'none')
                .attr('stroke-width', '4')
                .attr('filter', 'url(#splotch)')
            this.svg
                .select(`g.${c}`)
                .append('g')
                .append('path')
                .attr('class', 'outline1')
                .attr('d', d3.line().curve(d3['curveMonotoneX'])(box))
                .attr('stroke-width', '4')
                .attr('fill', 'none')
                .attr('stroke', theme.colors.black)
                .attr('filter', 'url(#splotch)')
        })

        this.update()
    }

    setMultiplierX(multiplierX) {
        this.props.multiplierX = multiplierX
        this.update()
    }

    setMultiplierY(multiplierY) {
        this.props.multiplierY = multiplierY
        this.update()
    }

    setSpectrum(spectrum) {
        this.props.spectrum = spectrum
        this.update()
    }

    resize(width, height) {
        const { svg, props } = this

        props.width = width
        props.height = height

        svg.attr('width', props.width).attr('height', props.height)

        this.update()
    }

    setOptions(options) {
        this.props = options
        this.update()
    }

    setOffset(offset) {
        this.props.offset = offset
        this.update()
    }

    setFrequency(frequency) {
        this.props.omega = frequency
        this.update()
    }

    getDrawer(batch) {
        const {
            count,
            numbers,
            amplitudeX,
            amplitudeY,
            omega,
            offset,
            multiplierX,
            multiplierY,
            width,
            height,
        } = this.props

        const originX = width / 2
        const originY = height / 2

        const squarewaveTransformX = (time) =>
            fourier(amplitudeX, omega, time, numbers, squareWaveSequenceSin)
        const squarewaveTransformY = (time) =>
            fourier(amplitudeY, omega, time, numbers, squareWaveSequenceSin)

        const arc = Array.from({ length: count }, (_, i) => [
            originX + squarewaveTransformX(multiplierX * (i + batch - offset)),
            originY + squarewaveTransformY(multiplierY * (i + batch + offset)),
        ])

        return d3.line().curve(d3['curveBasisClosed'])(arc)
    }

    update() {
        const { classes } = this
        const drawer = this.getDrawer()

        this.classes.forEach((c) => {
            this.svg
                .select(`g.${c}`)
                .selectAll('path.door')
                .attr('d', (d) => this.getDrawer(d))
                .attr('stroke', theme.colors.black)
                .attr('fill', (d) =>
                    !this.props.spectrum
                        ? 'none'
                        : getSpectrumPosition(
                              this.props.spectrum +
                                  d / (this.props.count * 2.4),
                              0.3
                          )
                )
            this.svg
                .select(`g.${c}`)
                .selectAll('path.outline')
                .attr(
                    'fill',
                    this.props.spectrum
                        ? getSpectrumPosition(this.props.spectrum - 0.5, 0.3)
                        : 'none'
                )
        })
    }

    getSvg() {
        const { svg } = this
        return svg
    }
}

export default Vector
