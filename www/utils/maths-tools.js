export const percent = (value, decimals = 0) => {
  const multiplier = Math.pow(100, 2 + decimals);
  return Math.floor(value * multiplier) / (multiplier / 100);
}

export const degreesToRadians = (degrees) => degrees * (Math.PI / 180)

export const polarToCartesian = (radius, theta) => ([
  radius * Math.cos(theta),
  radius * Math.sin(theta),
])

export const distance = (x, y) => Math.sqrt((x * x) + (y * y))

// f(t) = y
// given an amplitude, omega, and time(x) in a usual simple harmonic motion fashion,
// as well as an additional array of activated fourier elements and a sequence to sum them using the proper transformation
// you get back the y value at the given time t
export const fourier = (amplitude, omega, time, arr, sequence) => amplitude * sequence(omega, time, arr)

// for a square wave, b_n = 6/(n * Pi)
export const squareWaveSin = (omega, time, beta) => (2 / (beta * Math.PI)) * Math.sin(omega * time * beta)
export const squareWaveCos = (omega, time, beta) => (2 / (beta * Math.PI)) * Math.cos(omega * time * beta)

// the sequence for a square wave is 3/2 + odds.sum((n) => b_n * sin(n * t))
export const squareWaveSequenceSin = (omega, time, odds) => odds.reduce((acc, beta) => acc + squareWaveSin(omega, time, beta), 0)
export const squareWaveSequenceCos = (omega, time, odds) => odds.reduce((acc, beta) => acc + squareWaveCos(omega, time, beta), 0)
