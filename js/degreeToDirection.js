export default function degreeToDirection(degree) {
  let d = ["n", "ne", "e", "se", "s", "sw", "w", "nw"];
  if (degree > 337.5 || degree <= 22.5) {
    return d[0];
  } else if (degree <= 67.5) {
    return d[1];
  } else if (degree <= 112.5) {
    return d[2];
  } else if (degree <= 157.5) {
    return d[3];
  } else if (degree <= 202.5) {
    return d[4];
  } else if (degree <= 247.5) {
    return d[5];
  } else if (degree <= 292.5) {
    return d[6];
  } else if (degree <= 337.5) {
    return d[7];
  } else {
    return null;
  }
}
