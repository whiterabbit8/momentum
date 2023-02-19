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
    const currentDay = date.toLocaleDateString('en-En', options);
    day.textContent = currentDay;
}

showDate();


const greeting = document.querySelector('.greeting');

function getTimeOfDay() {
    const date = new Date();
    const hours = date.getHours();
    if (hours < 6) return 'night';
    else if (hours < 12) return 'morning';
    else if (hours < 18) return 'afternoon';
    else return 'evening';
}

const timeOfDay = getTimeOfDay();
console.log(timeOfDay);

function showGreeting() {
    greeting.textContent = `Good ${getTimeOfDay()}`;
    setTimeout(showGreeting, 1000);
}

showGreeting();

const userName = document.querySelector('.name');

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