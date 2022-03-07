let form = document.querySelector('form');

form.addEventListener('submit', createRecipe);

function createRecipe(event) {
    event.preventDefault();

    let formData = new FormData(event.currentTarget);

    let name = formData.get('name');
    let img = formData.get('img');
    let ingredients = formData.get('ingredients').split('\n');
    let steps = formData.get('steps').split('\n');

    fetch('http://localhost:3030/data/recipes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': localStorage.getItem('accessToken')
        },
        body: JSON.stringify({name,
             img,
              ingredients,
               steps})
    })
    .then(response => response.json())
    .then(recipe => {
        // JSON.parse(recipe);
        console.log(recipe);
        location.href = 'index.html';
    });
}