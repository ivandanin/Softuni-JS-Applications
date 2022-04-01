import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAllItems() {
    return api.get('/data/albums?sortBy=_createdOn%20desc&distinct=name');
}

export async function getItemById(id) {
    return api.get('/data/albums/' + id);
}

export async function getMyItems(userId) {
    return api.get(`/data/albums?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function createItem(album) {
    return api.post('/data/albums', album);
}

export async function deleteById(id) {
    return api.del('/data/albums/' + id);
}

export async function editItem(id, album) {
    return api.put('/data/albums/' + id, album);
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

export async function search(query) {
    return api.get(`/data/albums?where=name%20LIKE%20%22${query}%22`);
}

export async function getComments(gameId) {
    return api.get(`/data/comments?where=gameId%3D%22${gameId}%22`);
}

export async function createComment(comment) {
    return api.post('/data/comments', comment);
}