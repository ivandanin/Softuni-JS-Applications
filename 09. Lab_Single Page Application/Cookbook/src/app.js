import {router} from './router.js';

window.addEventListener('load', () => {

    let guestNavigation = document.querySelector('#guest');
    let userNavigation = document.querySelector('#user');
    guestNavigation.style.display = 'inline';
    userNavigation.style.display = 'inline';

    let navigationElement = document.querySelector('.navigation');
    navigationElement.addEventListener('click', (event) => {
        event.preventDefault();

        if (event.target == 'A') {
            let url = new URL(event.target.href);
            document.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
            router(url.pathname);
        }
    })
});