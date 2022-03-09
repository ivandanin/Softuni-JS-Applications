export const request = (method, url, data) => {
    let options = {};
    if (method != 'GET') {
        options = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify(data)
        }
    }
    return fetch(url, options)
    .then(response => response.json())
};

export const get = request.bind(null, 'GET');

