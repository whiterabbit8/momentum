const burger = document.querySelector('.burger-menu');
const menu = document.querySelector('.header-nav');
const page = document.querySelector('.main-container');
const menuItems = document.querySelectorAll('.nav-link');
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

for (let i = 0; i < menuItems.length; i += 1) {
    menuItems[i].addEventListener('click', function() {
        burger.classList.remove('active');
        menu.classList.remove('active');
        body.classList.remove('noscroll');
    })
}


