import {renderHome} from './home.js';
import { renderLogin } from './login.js';

export function router(path) {
    hideContent();

    if (path == '/') {
        renderHome();
    } else if (path == '/login') {
        renderLogin();
    }
}

function hideContent() {
    let mainContent = document.querySelector('.main-content')
    for (const section of mainContent.children) {
        section.style.display = 'none';
    }
}