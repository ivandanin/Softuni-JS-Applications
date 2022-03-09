import {getToken} from './auth.js';
import {get} from './request.js';

let baseUrl = 'http://localhost:3030';
let recipesUrl = `${baseUrl}/data/recipes`;
let loginUrl = `${baseUrl}/users/login`;

export const getRecipes = () => get(recipesUrl);

export const createRecipes = (data) => {
    return fetch(recipesUrl, {
        method: 'POST',
        headers: {
            'content-type': 'application/json', 
            'X-Authorization': getToken()
        }, 
        body: JSON.stringify(data)
    })
    .then(response => response.json())
}

export const login = (email, password) => {
    fetch(loginUrl , {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify({email, password})
    })
    .then(response => response.json())
}
