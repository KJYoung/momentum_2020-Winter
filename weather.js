const weather = document.querySelector(".js-weather");
const tempmaxmin = document.querySelector(".js-tempmaxmin");
const weatherDescription = document.querySelector(".js-weatherDescription");

const WEATHER_API_KEY = '811cc62ce702483a88dc8fcf9a1ef6aa';
const COORDS = 'coords';

function getWeather(lat, lon){
    fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    ).then(function(response){
        return response.json();
    }).then(function(json){
        const temperature = json.main.temp;
        const temp_min = json.main.temp_min;
        const temp_max = json.main.temp_max;
        const location = json.name;
        const weatherDescribe = json.weather[0].description;

        weather.innerText = `${temperature}ºC @ ${location}`;
        tempmaxmin.innerText = `MAX : ${temp_max}ºC // min : ${temp_min}ºC`;
        weatherDescription.innerText = `The Weather is ["${weatherDescribe}"] now.`;
    });
}

function handleGeoSuccess(position){
    console.log(position);
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitude, longitude
    };
    localStorage.setItem(COORDS, JSON.stringify(coordsObj));
    getWeather(latitude, longitude);
}

function handleGeoError(){
    console.log("error for getting location");
}

function askForCoords(){
    navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if(loadedCoords === null){
        askForCoords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longitude);
    }
}

function init(){
    loadCoords();
}

init();

//{"coord":{"lon":126.98,"lat":37.57},"weather":[{"id":602,"main":"Snow","description":"heavy snow","icon":"13n"},{"id":701,"main":"Mist","description":"mist","icon":"50n"}],"base":"stations","main":{"temp":267.44,"feels_like":263.6,"temp_min":267.15,"temp_max":268.15,"pressure":1019,"humidity":92},"visibility":1000,"wind":{"speed":1.5,"deg":190},"snow":{"1h":0.27},"clouds":{"all":90},"dt":1609930500,"sys":{"type":1,"id":8117,"country":"KR","sunrise":1609886833,"sunset":1609921681},"timezone":32400,"id":1835848,"name":"Seoul","cod":200}