const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const body = document.querySelector('body');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const error = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');


function showTime() {
    const date = new Date();
    const currentTime = date.toLocaleTimeString();
    time.textContent = currentTime;
    setTimeout(showTime, 1000);
}
showTime();

function showDate() {
    const date = new Date();
    const options = {weekday: 'long', day: 'numeric', month: 'long'};
    const currentDay = date.toLocaleDateString('en-En', options);
    day.textContent = currentDay;
}
showDate();

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 6) return 'night';
    else if (hours < 12) return 'morning';
    else if (hours < 18) return 'afternoon';
    else return 'evening';
}

function showGreeting() {
    greeting.textContent = `Good ${getTimeOfDay()}`;
    setTimeout(showGreeting, 1000);
}
showGreeting();

function setLocalStorage() {
    localStorage.setItem('userName', userName.value);
    localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    } else {
        city.value = 'Minsk';
    }
    if (localStorage.getItem('userName')) {
        userName.value = localStorage.getItem('userName');
    }
}    
window.addEventListener('DOMContentLoaded', () => {
    getLocalStorage();
    getWeather();
    getQuotes();
});

function getRandomNum() {
    randomNum = Math.floor(Math.random() * 20 + 1);
  }
getRandomNum();

function setBg() {
    const bgNum = `${randomNum}`.padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/whiterabbit8/stage1-tasks/assets/images/${getTimeOfDay()}/` + bgNum + '.jpg';
    img.onload = () => {
        body.style.background = `url('https://raw.githubusercontent.com/whiterabbit8/stage1-tasks/assets/images/${getTimeOfDay()}/` + bgNum + ".jpg')";
    }
}
setBg();

function getSlideNext() {
    randomNum < 20 ? randomNum += 1 : randomNum = 1;
    setBg();
}

function getSlidePrev() {
    randomNum !== 1 ? randomNum -= 1 : randomNum = 20;
    setBg();
}
slideNext.addEventListener('click', getSlideNext);
slidePrev.addEventListener('click', getSlidePrev);


async function getWeather() {
    try {
        error.textContent = '';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=a16a6915164b8087be79069c331a94a6&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherDescription.textContent = data.weather[0].description;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        wind.textContent = `Wind speed: ${data.wind.speed} m/s`;
        humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
        setTimeout(getWeather, 15 * 60 * 1000);
    }
    catch {
        showError();
    }
}   

function showError() {
    weatherDescription.textContent = '';
    temperature.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
    error.textContent = 'Error: wrong city name';
}

function setCity(event) {
    if ((event.code === 'Enter') || (event.code === 'NumpadEnter')) {
        getWeather();
        city.blur();
        city.value = city.value.toLowerCase();
    }
}

city.addEventListener('keypress', setCity);

async function getQuotes() {  
    const quotes = 'js/quotes.json';
    const res = await fetch(quotes);
    const data = await res.json();
    const randomQuote = data[Math.floor(Math.random() * data.length)];
    quote.textContent = `"${randomQuote.quote}"`;
    author.textContent = randomQuote.author;
}

changeQuote.addEventListener('click', getQuotes);

const audio = new Audio();
const playBtn = document.querySelector('.play');
let isPlay = false;
let playNum = 0;
const playNextBtn = document.querySelector('.play-next');
const playPrevtBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');

import playList from './playList.js';

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    if (!isPlay) {
        audio.play();
        isPlay = true;
    } else {
        audio.pause();
        isPlay = false;
    }
  }

function toggleBtn() {
    playBtn.classList.toggle('pause');
    playAudio();
}

playBtn.addEventListener('click', toggleBtn);

function playNext() {
    playNum < playList.length - 1 ? playNum += 1 : playNum = 0;
    isPlay = false;
    playAudio();
}

function playPrev() {
    playNum !== 0 ? playNum -= 1 : playNum = playList.length - 1;
    isPlay = false;
    playAudio();
}

playNextBtn.addEventListener('click', playNext);
playPrevtBtn.addEventListener('click', playPrev);

/*function showPlayList(elem) {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[elem].title;
    playListContainer.append(li);
}*/

playList.forEach(elem => {
    const li = document.createElement('li');
    li.classList.add('play-item');
    li.textContent = playList[elem].title;
    playListContainer.append(li);
});


