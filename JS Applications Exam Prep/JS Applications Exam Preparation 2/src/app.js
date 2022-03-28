import { page, render } from "./lib.js";
import {homePage} from './views/home.js';

const main = document.querySelector('main');
const logoutBtn = document.getElementById('logoutBtn');

page(decorateContext);
page('/', homePage);

function decorateContext(context, next) {
    context.render = (content) => render(content, main);
    next();
}