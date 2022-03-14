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

    let title = formData.get('title');
    let description = formData.get('description');
    let img = formData.get('imageUrl');

    await createMovie(title, description, img);
    form.reset();
    showHomePage();
}

async function createMovie(title, description, img) {
    let user = JSON.parse(localStorage.getItem('user'));

    await fetch('http://localhost:3030/data/movies', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': user.accessToken
        }, 
        body: JSON.stringify({title, description, img})
    });
}