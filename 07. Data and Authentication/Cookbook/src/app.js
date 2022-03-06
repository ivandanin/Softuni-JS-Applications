let baseUrl = 'http://localhost:3030';

window.addEventListener('load', () => {
    let guest = document.querySelector('#guest');
    let user = document.querySelector('#user');
    let logoutBtn = document.getElementById('logoutBtn');

    logoutBtn.addEventListener('click', logout);

    if (!localStorage.getItem('accessToken')) {
        guest.style.display = 'block';
    } else {
        user.style.display = 'block';
    }

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
    fetch(`${baseUrl}/data/recipes`)
    .then(response => response.json())
    .then(recipes => {
        renderRecipes(Object.values(recipes));
    });
}

function getRecipesById(id) {
    fetch(`${baseUrl}/data/recipes` + id)
    .then(response => response.json())
    .then(recipes => {
        renderRecipes(recipes);
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

function logout(event) {
    event.preventDefault();
    localStorage.clear();
    location.href = 'index.html';
}