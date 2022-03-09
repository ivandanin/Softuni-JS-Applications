import * as auth from '../auth.js';
import {login} from '../api.js';

let loginSection = document.querySelector('.login');
let loginForm = document.querySelector('.login form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    let email = formData.get('email');
    let password = formData.get('password');

    login(email, password)
    .then(user => {
        auth.saveUser(user);
        auth.updateAuth();
        alert('You are in!');
    });

});

export function renderLogin() {
    loginSection.style.display = 'block';

}