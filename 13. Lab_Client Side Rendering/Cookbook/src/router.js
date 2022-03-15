import { renderHome } from './pages/home.js';
import { renderLogin } from './pages/login.js';
import { renderLogout } from './auth.js';
import { renderRegister } from './pages/register.js';
import { renderError } from './pages/error.js';
import { renderCreate } from './pages/create.js'; 

let routes = {
    '/': renderHome,
    '/login': renderLogin,
    '/register': renderRegister,
    '/create': renderCreate,
    '/logout': renderLogout
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