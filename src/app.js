function formatDate (timestamp) {
let date = new Date (timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
 if (minutes < 10) {
    minutes = `0${minutes}`;}
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}

function formatDay (timestamp){
let date = new Date(timestamp * 1000);
let day = date.getDay();
let days = [
  "Sun",
  "Mon",
  "Tues",
  "Weds",
  "Thurs",
  "Fri",
  "Sat",
];

return days[day];
}

function displayForecast(response) {
    let forecast = response.data.daily;
    let forecastElement = document.querySelector("#forecast");
    
    let forecastHTML = `<div class = "row">`;
    forecast.forEach(function(forecastDay, index){
      if (index > 0 && index < 7) {
        forecastHTML =
          forecastHTML +
          `<div class="col-2">
                <div class="weather-forecast-day">
                ${formatDay(forecastDay.dt)}
                </div>
                <img src="https://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png" alt="" width="50px">
                <div class="weather-forecast-temp">
                    <span class="weather-forecast-temp-max">
                    ${Math.round(forecastDay.temp.max)}°
                    </span>
                     <span class="weather-forecast-temp-min">
                    ${Math.round(forecastDay.temp.min)}°
                    </span>
                </div>
            </div>
        `;
      }
    });
    
    forecastHTML = forecastHTML + `</div>`;
    forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates){
    let apiKey = "62231151ce343c4d68652e1617efc22f";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}

function displayTemperature (response) {
    celciusTemperature = response.data.main.temp;

    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(celciusTemperature);
    let cityElement = document.querySelector("#city");
     cityElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
      descriptionElement.innerHTML = response.data.weather[0].description;
    let humidityElement = document.querySelector("#humidity");
      humidityElement.innerHTML = response.data.main.humidity;
    let windElement = document.querySelector("#wind");
      windElement.innerHTML = Math.round(response.data.wind.speed);
    let dateElement = document.querySelector("#date");
      dateElement.innerHTML = formatDate(response.data.dt * 1000);
    let iconElement = document.querySelector("#icon");
        iconElement.setAttribute ("src",`https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
        iconElement.setAttribute("alt", response.data.weather[0].description);
    
    getForecast(response.data.coord);
    }

function showLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "733dfaa98425c3e233718439f77dabb3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;
  axios.get(apiUrl).then(displayTemperature);
}

function search(city){
let apiKey = "733dfaa98425c3e233718439f77dabb3";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function showCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

function displayFarenheit(event){
    event.preventDefault();
    let farenheitTemperature = (celciusTemperature * 9) / 5 + 32;
    let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = Math.round(farenheitTemperature);
    
    celciusLink.classList.remove("active"); 
    farenheitLink.classList.add("active"); 
}

function displayCelcius(event){
   event.preventDefault(); 
    let temperatureElement = document.querySelector("#temperature");
        temperatureElement.innerHTML = Math.round(celciusTemperature);

    farenheitLink.classList.remove("active"); 
    celciusLink.classList.add("active"); 
}

let celciusTemperature =  null

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let farenheitLink = document.querySelector("#farenheit");
farenheitLink.addEventListener("click", displayFarenheit);

let celciusLink = document.querySelector("#celcius");
celcius.addEventListener("click", displayCelcius);

let button2 = document.querySelector("#button2");
button2.addEventListener("click", showCurrentLocation);

search("London");