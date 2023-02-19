const time = document.querySelector('.time');
const day = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const userName = document.querySelector('.name');
const body = document.querySelector('body');
let randomNum;
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');


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
}

window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
    if (localStorage.getItem('userName')) {
        userName.value = localStorage.getItem('userName');
    }
}

window.addEventListener('load', getLocalStorage);

function getRandomNum() {
    randomNum = Math.floor(Math.random() * 20 + 1);
  }

getRandomNum();
  console.log(randomNum);

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