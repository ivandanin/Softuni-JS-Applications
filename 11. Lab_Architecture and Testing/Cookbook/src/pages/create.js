import {createRecipes} from '../api.js';

let createSection = document.querySelector('.create');
let createForm = createSection.querySelector('form');

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

    createRecipes(data)
    .then(data => {
        alert('You have created a new recipe!')
    })
});

export function renderCreate() {
    createSection.style.display = 'block';
}