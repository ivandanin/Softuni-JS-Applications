import {createElement} from '../dom.js';

const url = 'http://localhost:3030/data/recipes/';
let main;
let section;
let setActiveNav;

async function getRecipeById(id) {
    const response = await fetch(`${url}${id}`);
    const recipe = await response.json();

    return recipe;
}

async function deleteRecipeById(id) {
    const token = localStorage.getItem('user');

    const response = await fetch(`${url}${id}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token
        }
    });

    if (response.status != 200) {
        const error = await response.json();
        throw new Error(error.message);
    }

    section.innerHTML = '';
    section.appendChild(createElement('article', {}, createElement('h2', {}, 'Recipe deleted')));
}

function createRecipeCard(recipe) {
    const result = createElement('article', {}, 
    createElement('h2', {}, recipe.name),
    createElement('div', {className: 'band'},
        createElement('div', {className: 'thumb'}, createElement('img', {src: recipe.img})),
        createElement('div', {className: 'ingredients'}, 
            createElement('h3', {}, 'Ingredients: '),
            createElement('ul', {}, recipe.ingredients.map(i => createElement('li', {}, i))),
            )
        ),
        createElement('div', {className: 'description'},
            createElement('h3', {}, 'Preparation:'),
            recipe.steps.map(s => createElement('p', {}, s))
        ),
    );

    const userId = localStorage.getItem('userId');
    
    if (userId != null && recipe._ownerId == userId) {
        result.appendChild(createElement('div', {className: 'controls'},
            // createElement('button', {onClick: () => showEdit(recipe.id)}, '\u270E Edit'),
            // createElement('button', {onClick: onDelete}, '\u2716 Delete'),
            ));
    }
    return result;
    
    function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${recipe.name}?`);
        if (confirmed) {
            deleteRecipeById(recipe._id);
        }
    }
}

export function setupDetails(targetMain, targetSection, activeNav) {
    targetMain = main;
    section = targetSection;
    setActiveNav = activeNav;
}

export async function showDetails(id) {
    setActiveNav();
    section.innerHTML = 'Loading&hellip;';
    main.innerHTML = '';
    main.appendChild(section);

    const recipe = await getRecipeById(id);
    section.innerHTML = '';
    section.appendChild(createRecipeCard(recipe));
}