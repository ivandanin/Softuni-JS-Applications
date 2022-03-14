import {showView, updateNav} from './util.js';
import {showHomePage} from './home.js';

let loginSection = document.querySelector('#form-login');

let form = loginSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function loginPage(){
    showView(loginSection);
}

async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);
    
    let email = formData.get('email');
    let password = formData.get('password');

    await login(email, password);
    form.reset();
    updateNav();
    showHomePage();
}

async function login(email, password) {
    try {
        let response = await fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify({email, password})
        });
        if (!response.ok) {
            let error = await response.json();
            throw new Error(error.message);
        }

        let user = await response.json();
        localStorage.setItem('user', JSON.stringify(user));

    } catch (error) {
        alert(error.message);
        throw error;
    }
}