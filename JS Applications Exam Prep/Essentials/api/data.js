import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllItems() {
    return api.get('/data/memes?sortBy=_createdOn%20desc');
}

export async function getItemById(id) {
    return api.get('/data/memes/' + id);
}

export async function getMyItems(userId) {
    return api.get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createItem(meme) {
    return api.post('/data/memes', meme);
}

export async function deleteById(id) {
    return api.del('/data/memes/' + id);
}

export async function editItem(id, meme) {
    return api.put('/data/memes/' + id, meme);
}

export async function LikeItem(bookId) {
    return api.post('/data/likes/', {bookId});
}

export async function getLikesByItemId(bookId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22&distinct=_ownerId&count`);
}

export async function getMyLikeByItemId(bookId, userId) {
    return api.get(`/data/likes?where=bookId%3D%22${bookId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}
