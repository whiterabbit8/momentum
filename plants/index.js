(function () {
    const burgerItem = document.querySelector('.burger-menu');
    const burgerMenu = document.querySelector('.header-nav');
    const burgerMenuClose = document.querySelector('.burger-menu-close');
    const navLinks = document.querySelectorAll('.nav-link');
    burgerItem.addEventListener('click', () => {
        burgerMenu.classList.add('header-nav-active')
    });
    burgerMenuClose.addEventListener('click', () => {
        burgerMenu.classList.remove('header-nav-active')
    });
    if (window.innerWidth <= 380) {
        for (let i = 0; i < navLinks.length; i += 1) {
            navLinks[i].addEventListener('click', () => {
                burgerMenu.classList.remove('header-nav-active');
            });
        }
    }
}());

