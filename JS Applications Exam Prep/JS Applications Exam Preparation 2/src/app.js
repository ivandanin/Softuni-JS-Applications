import { page, render } from "./lib.js";
import {homePage} from './views/home.js';
import { listingsPage } from "./views/listings.js";
import { loginPage } from "./views/login.js";

const main = document.querySelector('main');
const logoutBtn = document.getElementById('logoutBtn');

page(decorateContext);
page('/', homePage);
page('/all-listings', listingsPage);
page('/login', loginPage);

function decorateContext(context, next) {
    context.render = (content) => render(content, main);
    next();
}

page.start();