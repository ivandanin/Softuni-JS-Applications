import { showHomePage } from "./home.js";
import { loginPage } from "./login.js";
import { registerPage } from "./register.js";
import { createPage } from "./create.js";
import { updateNav } from "./util.js";
// import { detailsPage } from "./details.js";
// import {editPage} from "./edit.js";
const routes = {
    '/': showHomePage,
    '/login': loginPage,
    '/logout': logoutPage,
    '/register': registerPage,
    '/create': createPage
};

document.querySelector('nav').addEventListener('click', onNav);
document.querySelector('#add-movie-button a').addEventListener('click', onNav);

function onNav(event){
    if (event.target.tagName == 'A' &&
    event.target.href) {
        event.preventDefault();
        
        let url = new URL(event.target.href);
        let view = routes[url.pathname];

        if(typeof view == 'function') {
            view();
        }
    }
}

function logoutPage(){
    localStorage.removeItem('user');
    updateNav();
    alert('bye');
}

updateNav();
showHomePage();