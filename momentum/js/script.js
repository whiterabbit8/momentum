let language;
if (localStorage.getItem('language')) {
    language = localStorage.getItem('language');
} else {
    language = 'en';
}

// ***** Time and Date *****

const time = document.querySelector('.time');
const day = document.querySelector('.date');

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
    const currentDay = date.toLocaleDateString(`${language}-${language.toUpperCase()}`, options);
    day.textContent = currentDay;
}
showDate();

// ***** Greeting *****

const greetingTransl = [
    {
        'en': 'Good ',
        'ru': 'Добр',
    },
    {
        'en': 'night',
        'ru': 'ой ночи',
    },
    {
        'en': 'morning',
        'ru': 'ое утро',
    },
    {
        'en': 'afternoon',
        'ru': 'ый день',
    },
    {
        'en': 'evening',
        'ru': 'ый вечер',
    },
    {
        'en': '[Enter name]',
        'ru': '[Введите имя]',
    },
]


const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 6) return 1
    else if (hours < 12) return 2 
    else if (hours < 18) return 3 
    else return 4
}

function showGreeting() {
    greeting.textContent = `${greetingTransl[0][language]}${greetingTransl[getTimeOfDay()][language]},`;
    setTimeout(showGreeting, 1000);
}
showGreeting();

// ***** Local Storage *****

const cityTransl = {
    'en': 'Minsk',
    'ru': 'Минск',
}

const userName = document.querySelector('.name');
userName.setAttribute('placeholder', greetingTransl[5][language])

function setLocalStorage() {
    localStorage.setItem('userName', userName.value);
    if ((city.value.toLowerCase() === 'minsk') || (city.value.toLowerCase() === 'минск')) {
        localStorage.setItem('city', '');
    } else {
        localStorage.setItem('city', city.value);
    }
    for (let i = 0; i < switchBtn.length; i++) {
        localStorage.setItem(`checkbox${i}`, switchBtn[i].checked);
    }
    localStorage.setItem('language', language);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('city')) {
        city.value = localStorage.getItem('city');
    } else {
        city.value = cityTransl[language];
    }
    if (localStorage.getItem('userName')) {
        userName.value = localStorage.getItem('userName');
    }
    for (let i = 0; i < switchBtn.length; i++) {
        if (localStorage.getItem(`checkbox${i}`)) {
            if (localStorage.getItem(`checkbox${i}`) === 'true') {
                switchBtn[i].setAttribute('checked', '');
            } else {
                switchBtn[i].removeAttribute('checked');
            }
        }  
    }
}    

window.addEventListener('DOMContentLoaded', () => {
    getLocalStorage();
    getWeather();
    getQuotes();
});

// ***** Background *****

const body = document.querySelector('body');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');

function getRandomNum() {
    randomNum = Math.floor(Math.random() * 20 + 1);
  }
getRandomNum();

function setBg() {
    const bgNum = `${randomNum}`.padStart(2, '0');
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/whiterabbit8/stage1-tasks/assets/images/${greetingTransl[getTimeOfDay()]['en']}/` + bgNum + '.jpg';
    img.onload = () => {
        body.style.background = `url('https://raw.githubusercontent.com/whiterabbit8/stage1-tasks/assets/images/${greetingTransl[getTimeOfDay()]['en']}/` + bgNum + ".jpg')";
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

// ***** Weather *****

const weatherTransl = [
    {
        'en': 'Wind speed',
        'ru': 'Скорость ветра',
    },
    {
        'en': 'Humidity',
        'ru': 'Влажость',
    },
    {
        'en': 'm/s',
        'ru': 'м/с',
    },
    {
        'en': 'Error: wrong city name',
        'ru': 'Ошибка: не верный город',
    },
]

const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');
const error = document.querySelector('.weather-error');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');

async function getWeather() {
    try {
        error.textContent = '';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=a16a6915164b8087be79069c331a94a6&units=metric`;
        const res = await fetch(url);
        const data = await res.json(); 
        weatherIcon.className = 'weather-icon owf';
        weatherIcon.classList.add(`owf-${data.weather[0].id}`);
        weatherDescription.textContent = data.weather[0].description;
        temperature.textContent = `${Math.round(data.main.temp)}°C`;
        wind.textContent = `${weatherTransl[0][language]}: ${Math.round(data.wind.speed)} ${weatherTransl[2][language]}`;
        humidity.textContent = `${weatherTransl[1][language]}: ${Math.round(data.main.humidity)}%`;
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
    error.textContent = weatherTransl[3][language];
}

function setCity(event) {
    if ((event.code === 'Enter') || (event.code === 'NumpadEnter')) {
        getWeather();
        city.blur();
        city.value = city.value.toLowerCase();
    }
}

city.addEventListener('keypress', setCity);

// ***** Quotes *****

const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const changeQuote = document.querySelector('.change-quote');

async function getQuotes() {  
    const quotes = `js/quotes-${language}.json`;
    const res = await fetch(quotes);
    const data = await res.json();
    const randomQuote = data[Math.floor(Math.random() * data.length)];
    quote.textContent = `"${randomQuote.quote}"`;
    author.textContent = randomQuote.author;
}

changeQuote.addEventListener('click', getQuotes);

// ***** Audio Player *****

const audio = new Audio();
const songTitle = document.querySelector('.song-title');
const songArtist = document.querySelector('.song-artist');
const timeLine = document.querySelector('.time-line');
const playBtn = document.querySelector('.play');
let isPlay = false;
let playNum = 0;
const playNextBtn = document.querySelector('.play-next');
const playPrevtBtn = document.querySelector('.play-prev');
const playListContainer = document.querySelector('.play-list');
let audioTime = 0;
const trackTime = document.querySelector('.current-time');
const trackDuration = document.querySelector('.full-time');
const progress = document.querySelector('.track-time');
let mousedown = false;

import playList from './playList.js';

document.addEventListener('DOMContentLoaded', () => {
    audio.src = playList[playNum].src;
    showProgress();
    showCurrentSong();
});

function showCurrentSong() {
    songTitle.textContent = playList[playNum].title;
    songArtist.textContent = playList[playNum].artist;
    trackTime.textContent = '00:00';
    trackDuration.textContent = playList[playNum].duration;
}

function resetPlayer() {
    isPlay = false;
    audioTime = 0;
}

function playAudio() {
    audio.src = playList[playNum].src;
    audio.currentTime = audioTime;
    if (!isPlay) {
        audio.play();
        showPlayItem();
        showProgress();
        playBtn.classList.add('pause');
        isPlay = true;
    } else {
        audio.pause();
        audioTime = audio.currentTime;
        isPlay = false;
    }
  }

function toggleBtn() {
    playBtn.classList.toggle('pause');
    showPlayItem();
    playAudio();
}

playBtn.addEventListener('click', toggleBtn);

function showProgress() {
    audioTime = audio.currentTime;
    timeLine.style.width = (audioTime / audio.duration) * 100 + '%';
    trackTime.textContent = new Date(audioTime * 1000).toISOString().slice(14, 19);
    setTimeout(showProgress, 10);
}

audio.addEventListener('ended', playNext);

function playNext() {
    playNum < playList.length - 1 ? playNum += 1 : playNum = 0;
    resetPlayer();
    showCurrentSong();
    playAudio();
}

function playPrev() {
    playNum !== 0 ? playNum -= 1 : playNum = playList.length - 1;
    resetPlayer();
    showCurrentSong();
    playAudio();
}

playNextBtn.addEventListener('click', playNext);
playPrevtBtn.addEventListener('click', playPrev);

function showPlayList() {
    for (let i = 0; i < playList.length; i++) {
        const li = document.createElement('li');
        const divA = document.createElement('div');
        li.classList.add('play-item');
        divA.classList.add('artist');
        li.textContent = playList[i].title;
        divA.textContent = playList[i].artist;
        playListContainer.append(li);
        li.append(divA);
    }
}
showPlayList();

const playItem = document.querySelectorAll('.play-item');

function showPlayItem() {
    playItem.forEach(item => {
        if ((item.firstChild.textContent === songTitle.textContent) && !isPlay) {
            item.classList.add('item-active')
        } else {
            item.classList.remove('item-active')
        }
    })
}

function playChoosenSong() {
    for (let i = 0; i < playItem.length; i++) {
        playItem[i].addEventListener('click', () => {
            console.log(playItem.textContent);
            if (playItem[i].firstChild.textContent !== songTitle.textContent) {
                resetPlayer();
            }
            playNum = i;
            showCurrentSong();
            toggleBtn();
        })
    }
}
playChoosenSong();

function setProgress(event) {
    const offsetTime = (event.offsetX / progress.offsetWidth) * audio.duration;
    audio.currentTime = offsetTime;
}

progress.addEventListener('click', setProgress);
progress.addEventListener('mousemove', (e) => mousedown && setProgress(e));
progress.addEventListener('mousedown', () => (mousedown = true));
progress.addEventListener('mouseup', () => (mousedown = false));

const volumeLevel = document.querySelector('.volume-level');
const volumeBar = document.querySelector('.volume-bar');
const volumeBtn = document.querySelector('.volume');
let currentVolume = 0.75;

function muteVolume() {
    if (audio.volume !== 0) {
        audio.volume = 0;
        volumeLevel.style.width = '0';
    } else {
        audio.volume = currentVolume;
        volumeLevel.style.width = currentVolume * 100 + '%';
    }
    volumeBtn.classList.toggle('mute');
}

function setVolume(event) {
    const newVolume = event.offsetX / volumeBar.offsetWidth;
    audio.volume = newVolume;
    currentVolume = newVolume;
    volumeLevel.style.width = newVolume * 100 + '%';
}

volumeBar.addEventListener('click', setVolume);
volumeBar.addEventListener('mousemove', (e) => mousedown && setVolume(e));
volumeBar.addEventListener('mousedown', () => (mousedown = true));
volumeBar.addEventListener('mouseup', () => (mousedown = false));

volumeBtn.addEventListener('click', muteVolume);

const playListBtn = document.querySelector('.play-list-btn');

function hidePlayList() {
    playListContainer.classList.toggle('hide');
}

playListBtn.addEventListener('click', hidePlayList);

// ***** Translation *****

const switchBtn = document.querySelectorAll('.toggle-checkbox');

function setLanguage() {
    switchBtn[0].toggleAttribute('checked');
    switchBtn[0].hasAttribute('checked') ? language = 'ru' : language = 'en';
    window.location.reload();
}

switchBtn[0].addEventListener('click', setLanguage)

// ***** Settings *****

const settingsTransl = [
    {
        'en': 'Language',
        'ru': 'Язык',
    },
    {
        'en': 'Background image',
        'ru': 'Фоновое изображение',
    },
    {
        'en': 'Interface',
        'ru': 'Интерфейс',
    },
    {
        'en': 'English',
        'ru': 'Английский',
    },
    {
        'en': 'Russian',
        'ru': 'Русский',
    },
    {
        'en': 'GitHub',
        'ru': 'GitHub',
    },
    {
        'en': 'Unsplash',
        'ru': 'Unsplash',
    },
    {
        'en': 'Flickr',
        'ru': 'Flickr',
    },
    {
        'en': 'Time',
        'ru': 'Время',
    },
    {
        'en': 'Date',
        'ru': 'Дата',
    },
    {
        'en': 'Greeting',
        'ru': 'Приветствие',
    },
    {
        'en': 'Quote',
        'ru': 'Цитата',
    },
    {
        'en': 'Weather',
        'ru': 'Погода',
    },
    {
        'en': 'Audio Player',
        'ru': 'Аудио плеер',
    },
    {
        'en': 'Links',
        'ru': 'Ссылки',
    },
    {
        'en': '[Enter tag]',
        'ru': '[Введите тэг]',
    },
]

const settingsBtn = document.querySelector('.settings-btn');
const settings = document.querySelector('.settings');

function showSettings() {
    settingsBtn.classList.toggle('active');
    settings.classList.toggle('hide');
}

settingsBtn.addEventListener('click', showSettings);

const optionName = document.querySelectorAll('.option-name');
console.log(optionName);
const sectionName = document.querySelectorAll('.section-name');
const tag = document.querySelectorAll('.tag');

function translSettings() {
    for (let i = 0; i < optionName.length; i++) {
        optionName[i].textContent = settingsTransl[i + 3][language];
    }
    for (let i = 0; i < sectionName.length; i++) {
        sectionName[i].textContent = settingsTransl[i][language];
    }
    for (let i = 0; i < tag.length; i++) {
        tag[i].setAttribute('placeholder', settingsTransl[15][language]);
    }
}
translSettings();


/*function setSettingsStorage() {
    for (let i = 0; i < switchBtn.length; i++) {
        localStorage.setItem(`checkbox${i}`, switchBtn[i].checked);
    }
    localStorage.setItem('language', language);
}

window.addEventListener('beforeunload', setSettingsStorage);

function getSettingsStorage() {
    for (let i = 0; i < switchBtn.length; i++) {
        if (localStorage.getItem(`checkbox${i}`)) {
            if (localStorage.getItem(`checkbox${i}`) === 'true') {
                switchBtn[i].setAttribute('checked', '');
            } else {
                switchBtn[i].removeAttribute('checked');
            }
        }  
    }
}

window.addEventListener('DOMContentLoaded', () => {
    getSettingsStorage();
});*/