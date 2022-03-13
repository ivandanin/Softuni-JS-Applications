import { showHomePage } from "./home.js";
import { showView } from "./util.js";

let createSection = document.querySelector('#add-movie');
let form = createSection.querySelector('form');
form.addEventListener('submit', onSubmit);

export function createPage(){
    showView(createSection);
}

async function onSubmit(event) {
    event.preventDefault();

    let formData = new FormData(form);
    let email = formData.get('email');
    let password = formData.get('password');

    await login(email, password);
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
