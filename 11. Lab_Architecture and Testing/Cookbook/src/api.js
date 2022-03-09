import {get,post} from './request.js';

let baseUrl = 'http://localhost:3030';
let recipesUrl = `${baseUrl}/data/recipes`;
let loginUrl = `${baseUrl}/users/login`;

export const getRecipes = () => get(recipesUrl);

export const createRecipes = (data) => {
    return post(recipesUrl, data);
}

export const login = (email, password) => {
    return post(loginUrl , {email, password});
}
