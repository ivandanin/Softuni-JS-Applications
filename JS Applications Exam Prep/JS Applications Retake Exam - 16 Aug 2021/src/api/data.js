import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllItems() {
    return api.get('/data/games?sortBy=_createdOn%20desc');
}

export async function getRecent() {
    return api.get('/data/games?sortBy=_createdOn%20desc&distinct=category');
}

export async function getItemById(id) {
    return api.get('/data/games/' + id);
}

export async function getMyItems(userId) {
    return api.get(`/data/games?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createItem(game) {
    return api.post('/data/games', game);
}

export async function deleteById(id) {
    return api.del('/data/games/' + id);
}

export async function editItem(id, game) {
    return api.put('/data/games/' + id, game);
}
