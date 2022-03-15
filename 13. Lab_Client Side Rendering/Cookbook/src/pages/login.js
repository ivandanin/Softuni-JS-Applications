import {updateAuth} from '../auth.js';

let url = 'http://localhost:3030/users/login';

let loginSection = document.querySelector('.login');
let loginForm = document.querySelector('.login form');

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    let email = formData.get('email');
    let password = formData.get('password');

    fetch(url , {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(user => {
        localStorage.setItem('user', JSON.stringify(user));
        updateAuth();
        alert('You are in!');
    });

});

export function renderLogin() {
    loginSection.style.display = 'block';

}