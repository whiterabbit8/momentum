const burger = document.querySelector('.burger-menu');
const menu = document.querySelector('.header-nav');
const page = document.querySelector('.main-container');
const body = document.body;

burger.addEventListener('click', function() {
    burger.classList.toggle('active');
    menu.classList.toggle('active');
    body.classList.toggle('noscroll');
})

page.addEventListener('click', function() {
    burger.classList.remove('active');
    menu.classList.remove('active');
    body.classList.remove('noscroll');
})

