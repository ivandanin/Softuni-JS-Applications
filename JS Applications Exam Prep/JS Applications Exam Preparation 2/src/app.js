import { page, render } from "./lib.js";
import { getUserData } from "./util.js";
import {homePage} from './views/home.js';
import { listingsPage } from "./views/listings.js";
import { myListingsPage } from "./views/my-listings.js";
import { loginPage } from "./views/login.js";
import { registerPage } from "./views/register.js";
import { logout } from './api/api.js';
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";
import { createPage } from "./views/create.js";

const main = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

import * as api from './api/api.js';
window.api = api;

page(decorateContext);
page('/', homePage);
page('/all-listings', listingsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/myListings', myListingsPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/create', createPage);

updateNav();
page.start();

function decorateContext(context, next) {
    context.render = (content) => render(content, main);
    context.updateNav = updateNav;
    next();
}

function onLogout() {
    logout();
    updateNav();
    page.redirect('/');
}

function updateNav() {
    const userData = getUserData();

    if (userData) {
        document.querySelector('#profile').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
        document.querySelector('#profile a').textContent = `Welcome ${userData.username}`;
    } else {
        document.querySelector('#profile').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}