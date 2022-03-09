import {getRecipes} from '../api.js';

let homeSection = document.querySelector('.home');
let recipeList = homeSection.querySelector('.recipe-list');

export function renderHome() {
    getRecipes()
    .then(recipes => {
        renderRecipes(Object.values(recipes));
        homeSection.style.display = 'block';
    });
}

function renderRecipes(recipes) {
    let fragment = document.createDocumentFragment();

    recipes.forEach(x => {
        fragment.appendChild(renderRecipe(x));
    });

    recipeList.innerHTML = '';
    recipeList.appendChild(fragment);
}

function renderRecipe(recipe) {
    let recipeElement = document.createElement('article');
    recipeElement.classList.add('preview');
    recipeElement.innerHTML = `
        <div class="title">
            <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src="${recipe.img}">
        </div>`;

        return recipeElement;
}