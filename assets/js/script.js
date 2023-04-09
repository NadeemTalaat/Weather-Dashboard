function getLocation(cityName) {
  fetch(
    "http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=a67ac493f3a4c2258e0cace5348bb483"
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
}

function getWeather(cityCoords) {
  var cityLat = cityCoords.lat;
  var cityLon = cityCoords.lon;

  fetch(
    `api.openweathermap.org/data/2.5/forecast?lat=${cityLat}&lon=${cityLon}&appid=a67ac493f3a4c2258e0cace5348bb483`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      return data;
    });
}
