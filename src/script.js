let now = new Date();
let weekDay = document.querySelector("#weekday");

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];

let date = now.getDate();
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let month = months[now.getMonth()];

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

weekDay.innerHTML = `${day} | ${date} ${month} | ${hours}:${minutes}`;

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#city-name").innerHTML = response.data.name;
  document.querySelector("#current-temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  
 let iconElement = document.querySelector("#emoji-icon");
 iconElement.setAttribute(
   "src",
   `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
 );
 iconElement.setAttribute("alt", response.data.weather[0].description);
 
  
}

function search(cityName) {
  let apiKey = "c4c34c2ee0b71307b00dc7655493ef9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&&units=metric`;
  
  axios.get(apiUrl).then(displayWeather);
}

function submitSearch(event) {
  event.preventDefault();

  let citySearch = document.querySelector("#search-text");
  let cityName = citySearch.value;
  search(cityName);
}

function searchLocation(position) {
  let apiKey = "c4c34c2ee0b71307b00dc7655493ef9a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&&units=metric`;
  
  
  axios.get(apiUrl).then(displayWeather);
}

function showCurrentLoc(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", submitSearch);

let currentButton = document.querySelector("#button-currently");
currentButton.addEventListener("click", showCurrentLoc);

search("Figueira da Foz");
