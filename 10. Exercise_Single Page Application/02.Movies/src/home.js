import {showView, spinner} from './util.js';

let homeSection = document.querySelector('#home-page');
let catalog = document.querySelector('#movie .card-deck.d-flex.justify-content-center');

export function showHomePage(){
    showView(homeSection);
    displayMovies();
}

async function displayMovies() {
    catalog.replaceChildren(spinner());
    let movies = await getMovies();
    catalog.replaceChildren(...movies.map(createMoviePreview));
}

function createMoviePreview(movie) {
    let element = document.createElement('div');
    element.className = 'card mb-4';
    element.innerHTML = ` 
    <img class="card-img-top" src="${movie.img}"
        alt="Card image cap" width="400">
    <div class="card-body">
       <h4 class="card-title">${movie.title}</h4>
    </div>
    <div class="card-footer">
       <a data-id="${movie._id}" href="/details/${movie._id}">
           <button type="button" class="btn btn-info">Details</button>
       </a>
    </div>`;

    return element;
}

async function getMovies() {
    let response = await fetch('http://localhost:3030/data/movies');
    let data = await response.json();

    return data;
}