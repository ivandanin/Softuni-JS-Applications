import {getToken} from '../auth.js'
import { showDetails } from './details.js';

let createSection = document.querySelector('.create');
let createForm = createSection.querySelector('form');

let url = 'http://localhost:3030/data/recipes';

createForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData.get('ingredients').split('\n');
    let steps = formData.get('steps').split('\n');

    let data = {
        name, 
        img,
        ingredients,
        steps
    };

    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json', 
            'X-Authorization': getToken()
        }, 
        body: JSON.stringify(data)
    })
    .then(response => {
        if (response.status == 200) {
            showDetails(response.json()._id);
        }
    })
    .then(data => {
        if (response.status == 200) {
            showDetails()
        }
        alert('You have created a new recipe!')
    })
});

export function renderCreate() {
    createSection.style.display = 'block';
}