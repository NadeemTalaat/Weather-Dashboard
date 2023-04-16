function getLocation(cityName) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=a67ac493f3a4c2258e0cace5348bb483&limit=2`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

function getWeather(cityLat, cityLon) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=a67ac493f3a4c2258e0cace5348bb483&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data;
    });
}

function setValues(result) {
  $("#city-name").text(
    result.city.name + " " + result.list[0].dt_txt.slice(0, 10)
  );

  $("#city-conditions").attr({
    src: `https://openweathermap.org/img/wn/${result.list[0].weather[0].icon}@2x.png`,
    alt: `${result.list[0].weather[0].description}`,
  });

  $("#temp").text(result.list[0].main.temp + "°C");
  $("#wind").text(result.list[0].wind.speed + " m/s");
  $("#humidity").text(result.list[0].main.humidity + "%");

  $("#forecast-cards-container").html("");

  for (var i = 7; i <= result.list.length; i += 8) {
    var forecast = $("<div>");
    var dayForecast = $("<h5>");
    var tempForecast = $("<div>");
    var windForecast = $("<div>");
    var humidityForecast = $("<div>");
    var iconForecast = $("<img>");

    dayForecast.text(result.list[i].dt_txt.slice(0, 10));
    tempForecast.text("Temp: " + result.list[i].main.temp + "°C");
    windForecast.text("Wind: " + result.list[i].wind.speed + " m/s");
    humidityForecast.text("Humidity: " + result.list[i].main.humidity + "%");
    iconForecast.attr({
      src: `https://openweathermap.org/img/wn/${result.list[i].weather[0].icon}@2x.png`,
      alt: `${result.list[i].weather[0].description}`,
    });

    forecast.addClass("forecast-card col");
    dayForecast.addClass("forecast-date m-2");
    iconForecast.addClass("forecast-icon");

    $("#forecast-cards-container").append(forecast);
    forecast.append(dayForecast);
    forecast.append(iconForecast);
    forecast.append(tempForecast);
    forecast.append(windForecast);
    forecast.append(humidityForecast);
  }
}

function saveSearch(searchCity) {
  var searches = $("#history");
  var city = $("<button>");

  city.text(searchCity);
  city.addClass("history-button");

  searches.prepend(city);

  $(".history-button").on("click", onHistoryBtnClick);
}

function onSearchBtnClick() {
  saveSearch($("#cityValue").val());

  if (!$("#cityValue").val()) {
    alert("Please enter a city name");
  } else {
    getLocation($("#cityValue").val())
      .then(function (data) {
        var cityLat = data[0].lat;
        var cityLon = data[0].lon;

        return getWeather(cityLat, cityLon);
      })
      .then(function (result) {
        setValues(result);
      });
  }

  $("#cityValue").val("");
}

function onHistoryBtnClick() {
  getLocation($(this).text())
    .then(function (data) {
      var cityLat = data[0].lat;
      var cityLon = data[0].lon;

      return getWeather(cityLat, cityLon);
    })
    .then(function (result) {
      setValues(result);
    });
}

$("#search-button").on("click", onSearchBtnClick);
