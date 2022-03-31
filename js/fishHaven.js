import calcWindChill from "./windchill.js";
import degreeToDirection from "./degreeToDirection.js";

const currentWeatherReqUrl =
  "https://api.openweathermap.org/data/2.5/weather?id=5585010&appid=6b9da70692451588de922257bbe9e1ce";

const forecastReqUrl =
  "https://api.openweathermap.org/data/2.5/forecast?id=5585010&units=imperial&appid=6b9da70692451588de922257bbe9e1ce";
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function kToF(valNum) {
  valNum = parseFloat(valNum);
  return ((valNum - 273.15) * 1.8 + 32).toFixed();
}

function pad(num, size) {
  num = num.toString();
  while (num.length < size) num = "0" + num;
  return num;
}

function dayOfWeek(rawdate) {
  const data = new Date(rawdate);
  const daysOfTheWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = daysOfTheWeek[data.getUTCDay()];
  const date = pad(data.getUTCDate(), 2);

  return day + " " + date;
}

/* async function parallelCall() {
  let start_time = new Date().getTime();
  let promises = []
  let fetchUrls = [const currentWeatherReqUrl =
      "https://api.openweathermap.org/data/2.5/weather?lat=42.0963&lon=-111.8766&appid=6b9da70692451588de922257bbe9e1ce";
    const forecastReqUrl =
      "https://api.openweathermap.org/data/2.5/forecast/daily?lat=42.0963&lon=-111.8766&appid=6b9da70692451588de922257bbe9e1ce";]
  let result = []

  let currentCall = 0

  while (currentCall <= 1) {
    promises.push(fetch(fetchUrls[currentCall])
    .then(function (response) {
      return response.json();
    })
    .then(function (jsonObject) {}))
  }

  const data = await Promise.all(promises);
  data.forEach(({ data }) => {
    result = [...result, data];
  });

  //do stuff with results
} */

fetch(currentWeatherReqUrl)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const weather = jsonObject;
    console.log(weather);
    console.log();
    const currently = document.querySelector("#currently");
    const high = document.querySelector("#currentTemp");
    const windChill = document.querySelector("#windChillValue");
    const windChillElements = document.getElementsByClassName("windChill");
    const humidity = document.querySelector("#humidityValue");
    const windSpeedElement = document.querySelector("#windSpeed");
    const windSpeed = weather["wind"]["speed"].toFixed(1);
    const windDirection = weather["wind"]["deg"];
    const temp = weather["main"]["temp"];
    const calculatedWindSpeed = calcWindChill(temp, windSpeed);

    if (calculatedWindSpeed != "N/A") {
      windChill.textContent = calculatedWindSpeed;
    } else {
      //console.log(windChillElements);
    }

    windSpeedElement.textContent =
      degreeToDirection(windDirection).toUpperCase() +
      " " +
      windSpeed +
      " " +
      "mph";
    humidity.textContent = weather["main"]["humidity"] + "%";
    high.textContent = kToF(weather["main"]["temp_max"]) + "°";
    currently.textContent = capitalizeFirstLetter(
      weather["weather"][0]["description"]
    );
  });

fetch(forecastReqUrl)
  .then((response) => response.json())
  .then((jsonObject) => {
    const forecast = jsonObject["list"].filter((day) => {
      if (day.dt_txt.includes("18:00:00")) {
        return day;
      }
    });
    console.log(forecast);

    const days = 5;
    const cards = document.getElementsByClassName("card");
    const highTemps = [];
    //const lowTemps = [];
    const weatherIcons = [];
    const dates = [];

    //populate data
    for (let i = 0; i < days; i++) {
      highTemps.push(forecast[i]["main"]["temp_max"].toFixed(0));
      //lowTemps.push(forecast[i]["main"]["temp_min"].toFixed(0));
      weatherIcons.push(forecast[i]["weather"]["0"]["icon"]);
      dates.push(dayOfWeek(forecast[i]["dt_txt"]));
    }

    //deploy data
    for (let i = 0; i < days; i++) {
      const cardElements = [];
      const day = document.createElement("h3");
      const highTempElement = document.createElement("h3");
      //const lowTempElement = document.createElement("h3");
      const weatherImg = document.createElement("img");

      //lowTempElement.innerText = ;
      day.innerText = dates[i];
      highTempElement.innerText = highTemps[i] + "°";
      weatherImg.setAttribute(
        "src",
        "https://openweathermap.org/img/w/" + weatherIcons[i] + ".png"
      );

      cardElements.push(day, highTempElement, /*lowTempElement,*/ weatherImg);

      for (let y = 0; y < cardElements.length; y++) {
        cards[i].appendChild(cardElements[y]);
      }
    }
  });
