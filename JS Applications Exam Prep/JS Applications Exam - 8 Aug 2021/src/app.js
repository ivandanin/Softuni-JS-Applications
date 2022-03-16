import { page, render } from "./lib.js";
import {homePage} from '../src/views/home.js';
import {loginPage} from '../src/views/login.js';
import {registerPage} from '../src/views/register.js';
import { getUserData } from "./util.js";
import { logout } from "./api/data.js";

const root = document.getElementById('site-content');

page(decoratorContext);
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);

document.getElementById('logoutBtn').addEventListener('click', onLogout);

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

export function updateUserNav() {
    const userData = getUserData('userData');
    if (userData) {
        document.getElementById('user').style.display = 'inline-block';
        document.getElementById('guest').style.display = 'none';
        document.querySelector('#user span').textContent = `Welcome, ${userData.email}`;
    } else {
        document.getElementById('user').style.display = 'none';
        document.getElementById('guest').style.display = 'inline-block';
    }
}

function decoratorContext(context, next) {
    context.render = (context) => render(context, root);
    context.updateUserNav = updateUserNav;
    next();
}

updateUserNav();
page.start();