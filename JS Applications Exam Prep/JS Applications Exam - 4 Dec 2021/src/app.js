import { page, render } from './lib.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import {loginPage} from './views/login.js';
import { registerPage } from './views/register.js';
import { catalogPage } from './views/catalog.js';
import { logout } from './api/api.js';
// import { createPage } from './views/create.js';
import { detailsPage } from './views/details.js';
// import { editPage } from './views/edit.js';
// import { profilePage } from './views/profile.js';

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

page(decorateContext);
page('/', homePage);
page('/catalog', catalogPage);
page('/login', loginPage);
page('/register', registerPage);
// page('/create', createPage);
page('/details/:id', detailsPage)
// page('/edit/:id', editPage);
// page('/profile', profilePage)

updateUserNav();
page.start();

function decorateContext(context, next) {
    context.render = (content) => render(content, root);
    context.updateUserNav = updateUserNav;
    next();
}

function onLogout() {
    logout();
    updateUserNav();
    page.redirect('/');
}

function updateUserNav() {
    const userData = getUserData();

    if (userData) {
        document.querySelector('.user').style.display = 'block';
        document.querySelector('.guest').style.display = 'none';
    } else {
        document.querySelector('.user').style.display = 'none';
        document.querySelector('.guest').style.display = 'block';
    }
}