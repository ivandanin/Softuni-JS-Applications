import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAll() {
    return api.get('/data/pets?sortBy=_createdOn%20desc&distinct=name');
}

export async function getById(id) {
    return api.get('/data/pets/' + id);
}

export async function create(item) {
    return api.post('/data/pets', item);
}

export async function deleteById(id) {
    return api.del('/data/pets/' + id);
}

export async function edit(id, item) {
    return api.put('/data/pets/' + id, item);
}

export async function getDonateById(petId) {
    return api.get(`/data/donation?where=petId%3D%22${petId}%22&distinct=_ownerId&count`);
}

export async function getMyDonateById(petId, userId) {
    return api.get(`/data/donation?where=petId%3D%22${petId}%22%20and%20_ownerId%3D%22${userId}%22&count`);
}

export async function donateDollar(petId) {
    return api.post('/data/donation/', {petId});
}

window.donateDollar = donateDollar;