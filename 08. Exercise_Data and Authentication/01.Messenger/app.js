let url = 'http://localhost:3030/jsonstore/messenger';
let messages = document.getElementById('messages');

function attachEvents() {

        document.getElementById('submit').addEventListener('click', postMessage); // post
        document.getElementById('refresh').addEventListener('click', loadMessages); // get
}


async function postMessage() {
    let [author, content] = [document.getElementById('author'), document.getElementById('content')];
    if (author.value && content.value) {

        await request(url,
             {author: author.value, content: content.value});
        
        author.value = '';
        content.value = '';
        
    }

}

async function loadMessages() {
    fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data => {
        messages.value = Object.values(data).map(({author, content}) => `${author}: ${content}`).join('\n');
        console.log(Object.values(data));
    });
}

async function request(url, option) {

    if (option) {
        option = {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(option)
        };
    }
    let response = await fetch(url, option);
    return response.json();
}

attachEvents();