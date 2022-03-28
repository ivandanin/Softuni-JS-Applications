import * as api from './api.js';

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export async function getAll() {
    return api.get('/data/cars?sortBy=_createdOn%20desc');
}

export async function getById(id) {
    return api.get('/data/cars/' + id);
}

export async function getMy(userId) {
    return api.get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`);
}

export async function create(car) {
    return api.post('/data/cars', car);
} 

export async function deleteById(id) {
    return api.del('/data/cars' + id);
}

export async function edit(id, car) {
    return api.put('/data/cars/' + id, car);
}

