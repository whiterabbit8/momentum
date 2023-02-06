console.log('125 баллов\n1. При нажатии на кнопки:Gargens,Lawn,Planting происходит смена фокуса на услугах в разделе service +50\n2. Accordion в секции prices реализация 3-х выпадающих списков об услугах и ценах +50\n3. В разделе contacts реализован select с выбором городов +25');

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

for (let i = 0; i < menuItems.length; i ++) {
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
    })
})

srvBtn.forEach(btn => {
    btn.addEventListener('click', () => {
        if ((!btn.classList.contains('button-active')) && (buttonCounter === 0)) {
            srvItems.forEach(item => item.classList.remove('unactive'))
        }
        else if ((btn.classList.contains('button-active')) && (buttonCounter <= 1)) {
            srvItems.forEach(item => item.classList.add('unactive'))
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

const pricesItems = document.querySelectorAll('.prices-item');

for (let i = 0; i < pricesItems.length; i++) {
    document.querySelectorAll('.prices-item-name')[i].addEventListener('click', () => {
        if (pricesItems[i].classList.contains('active')) {
            pricesItems[i].classList.toggle('active');
        }
        else {
            pricesItems.forEach(item => item.classList.remove('active'));
            pricesItems[i].classList.toggle('active');
        }
    })
}

document.querySelector('.select-container').addEventListener('click', () => {
    document.querySelector('.selection-menu').classList.toggle('active');
})

const cityOption = document.querySelectorAll('.option');
const cardInfo = document.querySelectorAll('.info div');
let phoneNumber = document.getElementById('phone');

cityOption.forEach(option => {
    option.addEventListener('click', () => {
        document.querySelector('.selection').innerHTML = option.textContent;
        document.querySelector('.selection').classList.add('active');
        document.querySelector('.selection-menu').classList.remove('active');
        document.querySelector('.selection-menu').classList.add('move');
        document.querySelector('.contact-woman-img').classList.add('hide');
        document.querySelector('.city-card').classList.add('show');
    })
})

for (let i = 0; i < cityOption.length; i++) {
    cityOption[i].addEventListener('click', () => {
        switch (i) {
            case 0:
                let info0 = ['Canandaigua, NY', '+1 585 393 0001', '151 Charlotte Street'];
                for (let j = 0; j < cardInfo.length; j++) {
                    cardInfo[j].innerHTML = info0[j];
                }
                phoneNumber.setAttribute('href', `tel:${info[1]}`);
            case 1:
                let info1 = ['New York City', '+1 212 456 0002', '9 East 91st Street'];
                for (let j = 0; j < cardInfo.length; j++) {
                    cardInfo[j].innerHTML = info1[j];
                }
                phoneNumber.setAttribute('href', `tel:${info[1]}`);
            case 2:
                let info2 = ['Yonkers, NY', '+1 914 678 0003', '511 Warburton Ave'];
                for (let j = 0; j < cardInfo.length; j++) {
                    cardInfo[j].innerHTML = info2[j];
                }
                phoneNumber.setAttribute('href', `tel:${info[1]}`);
            case 3:
                let info3 = ['Sherrill, NY', '+1	315	908 0004', '14 WEST Noyes BLVD'];
                for (let j = 0; j < cardInfo.length; j++) {
                    cardInfo[j].innerHTML = info3[j];
                }
                phoneNumber.setAttribute('href', `tel:${info[1]}`);
        }
    });
} 



