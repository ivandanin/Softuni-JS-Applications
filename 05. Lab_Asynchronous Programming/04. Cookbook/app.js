let baseUrl = 'http://localhost:3030';

window.addEventListener('load', () => {
    getRecipes();
});

function renderRecipes(recipes) {
    let mainElement = document.querySelector('main');

    mainElement.innerHTML = '';
    recipes.forEach(r => {
        mainElement.appendChild(createRecipe(r));
    });
}

function createRecipe(recipe) {
    let recipeArticleElement = document.createElement('article');
    recipeArticleElement.classList.add('preview');

    recipeArticleElement.addEventListener('click', () => {
        fetch(`${baseUrl}/jsonstore/cookbook/details/${recipe._id}`)
            .then(response => response.json())
            .then(details => {
                let mainElement = document.querySelector('main');
                mainElement.innerHTML = '';
                mainElement.appendChild((renderDetailedRecipe(details)));
            });
    });

    recipeArticleElement.innerHTML = `
    <div class="title">
    <h2>${recipe.name}</h2>
        </div>
        <div class="small">
            <img src="${recipe.img}">
    </div>`;
    
    return recipeArticleElement;
}

function getRecipes() {
    fetch(`${baseUrl}/jsonstore/cookbook/recipes`)
    .then(response => response.json())
    .then(data => {
        renderRecipes(Object.values(data));
    });
}


function renderDetailedRecipe(details) {
    let recipeArticleElement = document.createElement('article');
    
    recipeArticleElement.innerHTML = `
    <article>
    <h2>${details.name}</h2>
    <div class="band">
        <div class="thumb">
            <img src="${details.img}">
        </div>
        <div class="ingredients">
            <h3>Ingredients:</h3>
            <ul>
                ${details.ingredients.map(i => `<li>${i}</li>`).join('')}
            </ul>
        </div>
    </div>
    <div class="description">
        <h3>Preparation:</h3>
         ${details.steps.map(i => `<p>${i}</p>`).join('')}
        </div>
    </article>`;

    return recipeArticleElement;
}
