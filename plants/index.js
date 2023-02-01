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

const srvBtn = document.querySelectorAll('.service-btns button');
const srvItems = document.querySelectorAll('.service-item');
let buttonCounter = 0;

srvBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        btn.classList.toggle('button-active'); 
        btn.classList.contains('button-active') ? buttonCounter += 1 : buttonCounter -= 1;
        if (buttonCounter === 2) {
            srvBtn.forEach(b => {
                if (!b.classList.contains('button-active')) {
                    b.disabled = true;
                }
            }) 
        }
        else {
            srvBtn.forEach(b => b.disabled = false)
        }
        console.log(buttonCounter);
        console.log(srvBtn[0].disabled === true);
        console.log(srvBtn[1].disabled === true);
        console.log(srvBtn[2].disabled === true);
    })
})

srvBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if ((!btn.classList.contains('button-active')) && (buttonCounter === 0)) {
            srvItems.forEach(item => item.classList.remove('unactive'))
        }
        else if ((btn.classList.contains('button-active')) && (buttonCounter <= 1)) {
            srvItems.forEach(item => item.classList.add('unactive'))
            console.log('размываю все')
        }
    })
})

srvBtn[0].addEventListener('click', () => {
    srvItems.forEach(item => {
        if (item.classList.contains('garden') && (buttonCounter !== 0)) {
            item.classList.toggle('unactive')
        }
        
    })
})

srvBtn[1].addEventListener('click', () => {
    srvItems.forEach(item => {
        if (item.classList.contains('lawn') && (buttonCounter !== 0)) {
            item.classList.toggle('unactive')
        }
    })
})

srvBtn[2].addEventListener('click', () => {
    srvItems.forEach(item => {
        if (item.classList.contains('planting') && (buttonCounter !== 0)) {
            item.classList.toggle('unactive')
        }
    })
})

