const url = "https://byui-cit230.github.io/weather/data/towndata.json";

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const towns = jsonObject["towns"];
    const weatherLocations = ["Preston", "Soda Springs", "Fish Haven"];
    let locationData = [];
    const home = document.querySelector("#home");
    let isLeft = true;

    for (var i = 0; i < towns.length; i++) {
      weatherLocations.forEach((location) => {
        if (location == towns[i].name) {
          locationData.push(towns[i]);
        }
      });
    }

    console.log(locationData);

    for (var i = 0; i < locationData.length; i++) {
      city = locationData[i];
      let link = document.createElement("a");
      let locationDiv = document.createElement("div");
      let container = document.createElement("ul");
      let cityName = document.createElement("li");
      let motto = document.createElement("li");
      let yearFounded = document.createElement("li");
      let population = document.createElement("li");
      let rainfall = document.createElement("li");
      let img = document.createElement("img");

      cityName.textContent = city.name;
      motto.textContent = city.motto;
      yearFounded.textContent = "Year Founded: " + city.yearFounded;
      population.textContent = "Population: " + city.currentPopulation;
      rainfall.textContent = "Annual Rain Fall: " + city.averageRainfall;

      if (isLeft) {
        locationDiv.setAttribute("class", "isLeft");
      } else {
        locationDiv.setAttribute("class", "isRight");
      }

      cityName.setAttribute("class", "name");
      motto.setAttribute("class", "motto");
      yearFounded.setAttribute("class", "descriptions");
      population.setAttribute("class", "descriptions");
      rainfall.setAttribute("class", "descriptions");
      img.setAttribute("src", "images/" + city.photo);

      if (city.name == "Preston") {
        link.setAttribute("href", "preston.html");
      } else if (city.name == "Soda Springs") {
        link.setAttribute("href", "sodaSprings.html");
      } else if (city.name == "Fish Haven") {
        link.setAttribute("href", "fishHaven.html");
      }

      container.append(cityName, motto, yearFounded, population, rainfall, img);
      link.append(container);
      locationDiv.append(link, img);

      home.appendChild(locationDiv);

      isLeft = !isLeft;
    }
  });
