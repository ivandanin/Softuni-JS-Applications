import { showView, spinner } from "./util.js";

let detailsSection = document.querySelector('#movie-example');
export function detailsPage(id){
    showView(detailsSection);
    displayMovie(id);
}

async function displayMovie(id) {
    detailsSection.replaceChildren(spinner());

    let user = JSON.parse(localStorage.getItem('user'));
    let [movie, likes, ownLike] = await Promise.all([
        getMovie(id),
        getLikes(id),
        getOwnLike(id, user)
    ]);

    detailsSection.replaceChildren(createMovieCard(movie, user, likes, ownLike));

}

function createMovieCard(movie, user, likes, ownLike) {
   

    let element = document.createElement('div');
    element.className = 'container';
    element.innerHTML = `
    <div class="row bg-light text-dark">
        <h1>Movie title: ${movie.title}</h1>

        <div class="col-md-8">
            <img class="img-thumbnail" src="${movie.img}"
                 alt="Movie">
        </div>
        <div class="col-md-4 text-center">
            <h3 class="my-3 ">Movie Description</h3>
            <p>${movie.description}</p>
            ${createControls(movie, user, likes, ownLike)}
        </div>
    </div>`;

    let likeBtn = element.querySelector('like-btn');
    if(likeBtn) {
        likeBtn.addEventListener('click', (event) => likeMovie(event, movie._id));
    }
    return element;
}

function createControls(movie, user, likes, ownLike) {
    let isOwner = user && user._id == movie._ownerId;
    let controls = [];
    if (isOwner) {
        controls.push(`<a class="btn btn-danger" href="#">Delete</a>`);
        controls.push(`<a class="btn btn-warning" href="#">Edit</a>`);
        
    } else if (user && ownLike == false){
        controls.push(`<a class="btn btn-primary like-btn" href="#">Like</a>`);
    }
    controls.push(`<span class="enrolled-span">Liked ${likes}</span>`);
    
    return controls.join('');

}

async function getMovie(id) {
    let response = await fetch(`http://localhost:3030/data/movies/${id}`);
    let movie = response.json();

    return movie;
}

async function getLikes(id) {
    let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${id}%22&distinct=_ownerId&count`);
    let likes = response.json();

    return likes;
}

async function getOwnLike(movieId, user) {
    if (!user) {
        return false;
    } else {
        let userId = user._id;
        let response = await fetch(`http://localhost:3030/data/likes?where=movieId%3D%22${movieId}%22%20and%20_ownerId%3D%22${userId}%22`);
        let like = response.json();
        
        return like;
    }
    return like.length > 0;
}

async function likeMovie(event, movieId) {
    event.preventDefault();

    let user = JSON.parse(localStorage.getItem('user'));
    
    await fetch('http://localhost:3030/data/likes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Authorization': user.accessToken
        },
        body: JSON.stringify({
            movieId
        })
    });

    detailsPage(movieId);
}