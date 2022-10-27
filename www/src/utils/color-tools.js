export const parseHexColor = (color) =>
  color
    .match(/^#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})$/)
    .slice(1)
    .map((e) => parseInt(e, 16));

export const hexToRgb = (color) => `rgb(${parseHexColor(color)})`;

// Note 1: For the sRGB colorspace, the relative luminance of a color is defined as L = 0.2126 * R + 0.7152 * G + 0.0722 * B where R, G and B are defined as:
//
// if RsRGB <= 0.03928 then R = RsRGB/12.92 else R = ((RsRGB+0.055)/1.055) ^ 2.4
// if GsRGB <= 0.03928 then G = GsRGB/12.92 else G = ((GsRGB+0.055)/1.055) ^ 2.4
// if BsRGB <= 0.03928 then B = BsRGB/12.92 else B = ((BsRGB+0.055)/1.055) ^ 2.4
//
// and RsRGB, GsRGB, and BsRGB are defined as:
//
// RsRGB = R8bit/255
// GsRGB = G8bit/255
// BsRGB = B8bit/255
export const luminance = (color) => {
  const [r, g, b] = parseHexColor(color);

  const rsrbg = r / 255;
  const gsrbg = g / 255;
  const bsrbg = b / 255;

  const calc = (n) =>
    n <= 0.03928 ? n / 12.92 : Math.pow((n + 0.055) / 1.055, 2.4);

  const R = calc(rsrbg);
  const G = calc(gsrbg);
  const B = calc(bsrbg);

  const L = 0.2126 * R + 0.7152 * G + 0.0722 * B;

  return L;
};

export const darkOrLight = (color) =>
  luminance(color) < 0.4 ? "white" : "black";

export const getRgbSpectrumArray = (i) => {
  const r = Math.round(127 * Math.cos(i + 2 * Math.PI)) + 128;
  const g = Math.round(127 * Math.sin(i + 2 * Math.PI)) + 128;
  const b = Math.round(127 * Math.cos(i + Math.PI)) + 128;

  return [r, g, b];
};

export const getSpectrumPosition = (i, a) => {
  const [r, g, b] = getRgbSpectrumArray(i);
  return a ? `rgba(${r}, ${g}, ${b}, ${a})` : `rgb(${r}, ${g}, ${b})`;
};
