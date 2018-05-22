class Color {
  constructor(r, g, b, a) {
    this.color = { r, g, b, a };
  }

  static WHITE = "#FFF";

  // static white = { r: 255, g: 255, b: 255, 1 };
}

function rgbToHsl(red, green, blue) {
  const rFactor = red / 255;
  const gFactor = green / 255;
  const bFactor = blue / 255;
  const cMax = Math.max(rFactor, gFactor, bFactor);
  const cMin = Math.min(rFactor, gFactor, bFactor);
  const delta = cMax - cMin;

  let hue;
  if (delta === 0) {
    hue = 0;
  } else if (cMax === rFactor) {
    hue = 60 * (((gFactor - bFactor) / delta) % 6);
  } else if (cMax === gFactor) {
    hue = 60 * ((bFactor - rFactor) / delta + 2);
  } else if (cMax === bFactor) {
    hue = 60 * ((rFactor - gFactor) / delta + 4);
  }

  let lum = (cMax + cMin) / 2;

  let sat = 0;
  if (delta !== 0) {
    sat = delta / (1 - Math.abs(2 * lum - 1));
  }

  console.log(hue, sat, lum);
}

export default Color;
