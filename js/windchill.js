export default function calcWindChill(temp, wSpeed) {
  if (wSpeed > 4.8 && temp < 50) {
    var windChill =
      35.74 +
      0.6215 * temp -
      35.75 * Math.pow(wSpeed, 0.16) +
      0.4275 * temp * Math.pow(wSpeed, 0.16);
    return Math.round(windChill) + "°";
  } else {
    return "N/A";
  }
}
