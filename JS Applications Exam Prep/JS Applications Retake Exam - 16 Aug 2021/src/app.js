import { page, render } from "./lib.js";
import {loginPage} from './views/login.js';
import { registerPage } from "./views/register.js";
import { logout } from "./api/api.js";
import { getUserData } from "./util.js";
import { catalogPage } from "./views/catalog.js";
import { homePage } from "./views/home.js";
import { createPage } from "./views/create.js";
import { detailsPage } from "./views/details.js";
import { editPage } from "./views/edit.js";

page(decorateContext);
page('/login', loginPage);
page('/register', registerPage);
page('/games', catalogPage);
page('/', homePage);
page('/create', createPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);

const root = document.querySelector('main');
document.getElementById('logoutBtn').addEventListener('click', onLogout);

updateNav();
page.start();

function decorateContext(context, next) {
    context.render = (content) => render(content, root);
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
        document.querySelector('#user').style.display = 'block';
        document.querySelector('#guest').style.display = 'none';
    } else {
        document.querySelector('#user').style.display = 'none';
        document.querySelector('#guest').style.display = 'block';
    }
}