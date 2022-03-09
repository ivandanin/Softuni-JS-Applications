import { renderHome } from './home.js';
import { renderLogin } from './login.js';
import { renderRegister } from './register.js';
import { renderError } from './error.js';
import { renderCreate } from './create.js'; 

let routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/create': renderCreate
}

export function router(path) {
    hideContent();

    let renderer = routes[path] || renderError;
    renderer();
}

function hideContent() {
    let mainContent = document.querySelector('.main-content')
    for (const section of mainContent.children) {
        section.style.display = 'none';
    }
}