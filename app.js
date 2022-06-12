// api.openweathermap.org/data/2.5/weather?q={city name}&appid={your api key}



var timeContainer = document.querySelector('.time');
const weatherApi = {
    key: "bab281d79e5f1e9755a68d754cc313e7",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather", 
}

const searchInputBox = document.getElementById('input-box');

// Event Listener Function on keypress
searchInputBox.addEventListener('keypress', (event) => {
    
    if(event.keyCode == 13) {
        console.log(searchInputBox.value);
        getWeatherReport(searchInputBox.value);
        document.querySelector('.weather-body').style.display = "block";
    }

});

// Get Weather Report
function getWeatherReport(city) {
    fetch(`${weatherApi.baseUrl}?q=${city}&appid=${weatherApi.key}&units=metric`)
    .then(weather => {
        return weather.json();
    }).then(showWeatherReport);
}


// function to play Audio
// source = parameter for getting the relative URL of the Audio File.
function playAudio(source){
    const music = new Audio(source);// to initialize the Audio Object
    music.play(); 
    music.loop =false;
    music.playbackRate = 1;

}



// Show Weather Report
function showWeatherReport(weather){
    console.log(weather);

    let city = document.getElementById('city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let temperature = document.getElementById('temp');
    temperature.innerHTML = `${Math.round(weather.main.temp)}&deg;C`;

    let minMaxTemp = document.getElementById('min-max');
    minMaxTemp.innerHTML = `${Math.floor(weather.main.temp_min)}&deg;C (min)/ ${Math.ceil(weather.main.temp_max)}&deg;C (max) `;

    let weatherType = document.getElementById('weather');
    weatherType.innerText = `${weather.weather[0].main}`;

    let date = document.getElementById('date');
    let todayDate = new Date();
    date.innerText = dateManage(todayDate);
    let time =todayDate.toLocaleTimeString();
    timeContainer.innerText = time;

    
    if(weatherType.textContent == 'Clear') {
        document.body.style.backgroundImage = "url('https://c.tenor.com/Ddhy-BalHD8AAAAC/dandelion.gif')";
       playAudio('./music/1.wav');

        
        
    } else if(weatherType.textContent == 'Clouds') {

        document.body.style.backgroundImage = "url('https://c.tenor.com/PLqmB_SmXQMAAAAM/clouds-sky.gif')";
        playAudio('./music/2.wav');

        
    } else if(weatherType.textContent == 'Haze') {

        document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/6d/1e/2a/6d1e2a64a3acde279938d7478cee0c2d.gif') " ;
        playAudio('./music/3.wav');

        
    }     else if(weatherType.textContent == 'Rain') {
        
        document.body.style.backgroundImage = "url('https://c.tenor.com/UkXBmkGcpNEAAAAC/rain-raining.gif')";
        playAudio('./music/4.wav');

        
    } else if(weatherType.textContent == 'Snow') {
        
        document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/95/b1/ea/95b1eaec001975a3fae4e4fc77d50176.gif')";
        playAudio('./music/5.wav');

    
    } else if(weatherType.textContent == 'Thunderstorm') {
    
        document.body.style.backgroundImage = "url('https://media2.giphy.com/media/l0MYOJCCE8yTfcwSY/giphy.gif')";
        playAudio('./music/6.wav');

        
    } 
}

// Date manage
function dateManage(dateArg) {

    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];

    return `${date} ${month} (${day}), ${year}`;
}
