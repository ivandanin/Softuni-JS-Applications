import {router} from './router.js';
import {updateAuth} from './auth.js';

updateAuth();
router('/');
window.addEventListener('load', () => {


    let navigationElement = document.querySelector('.navigation');
    navigationElement.addEventListener('click', (event) => {
        event.preventDefault();

        if (event.target.tagName == 'A') {
            let url = new URL(event.target.href);
            document.querySelector('.active').classList.remove('active');
            event.target.classList.add('active');
            router(url.pathname);
        }
    })
});