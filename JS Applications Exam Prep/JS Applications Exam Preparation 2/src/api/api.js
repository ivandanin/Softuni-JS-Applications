import { getUserData, setUserData, clearUseData } from "../util.js";

const localhost = 'http://localhost:3030';

async function request(url, options) {
    try {
        const response = await fetch(localhost + url, options);

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message);
        } 

        try {
            return await response.json();
        } catch(error) {
            return response;
        }

    } catch(error) {
        alert(error.message);
        throw error;
    }
}

async function createOptions(method = 'GET', data) {
    const options = {
        method,
        headers: {}
    };

    if (data != undefined) {
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const userData = getUserData();

    if(userData) {
        options.headers['X-Authorization'] = userData.token;
    }

    return options;
}

export async function get(url) {
    return request(url, createOptions());
}

export async function post(url, data) {
    return request(url, createOptions('post', data));
}

export async function put(url, data) {
    return request(url, createOptions('put', data));
}

export async function del(url) {
    return request(url, createOptions('delete'));
}

export async function login(email, password) {
    const data = await post('/users/login', {email, password});

    const userData = {
        email: data.email,
        id: data._id,
        token: data.accessToken
    };
    setUserData(userData);
    return data;
}

export async function register(email, password) {
    const data = await post('/users/register', {email, password});

    const userData = {
        email: data.email,
        id: data._id,
        token: data.accessToken
    };
    setUserData(userData);
    return data;
}

export async function logout() {
    get('users/logout');
    clearUseData();
}