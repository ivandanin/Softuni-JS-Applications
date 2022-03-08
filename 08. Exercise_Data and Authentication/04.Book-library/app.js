let url = 'http://localhost:3030/jsonstore/collections/books';

let tableBodyElement = document.querySelector('tbody');
let titleInputElement = document.getElementById('title');
let authorInputElement = document.getElementById('author');

function solve() {
    document.querySelector('#loadBooks').addEventListener('click', getAllBooks);
    document.getElementById('submit').addEventListener('click', addBook);
}

function getAllBooks(event) {
    tableBodyElement.replaceChildren();
    fetch(url)
    .then(response => response.json())
    .then(data => {
        Object.values(data).forEach((b) => {
            let {author, title, _id} = b;
            let tableRowElement = createElement('tr', undefined, tableBodyElement);
            tableRowElement.setAttribute('_id', _id)
            let titleElement = createElement('td', title, tableRowElement);
            let authorElement = createElement('td', author, tableRowElement);
            let buttons = createElement('td', undefined, tableRowElement);

            let editBtn = createElement('button', 'edit', buttons);
            editBtn.addEventListener('click', edit);
            
            let deleteBtn = createElement('button', 'delete', buttons);
            deleteBtn.addEventListener('click', deleteBook);

            tableBodyElement.appendChild(tableRowElement);
        });
    });
}

function addBook() {
    
    fetch(url, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify({title: titleInputElement.value, 
            author: authorInputElement.value})
    });
   
}

function edit(event) {
    event.preventDefault();
    let targetId = event.target.parentNode.parentNode.getAttribute('_id');

    fetch(`${url}/${targetId}`)
    .then(response => response.json())
    .then(data => {

        document.getElementById('h3').textContent = 'Edit FORM';
        document.getElementById('submit').textContent = 'Save';

        titleInputElement.value = data.title;
        authorInputElement.value = data.author;
    })
}

function deleteBook(event) {
    let targetId = event.target.parentNode.parentNode.getAttribute('_id');

    fetch(`${url}/${targetId}`, {
        method: 'DELETE'
    });
}

function createElement(type, text, appender) {
    let newElement = document.createElement(type);
    newElement.textContent = text;
    appender.appendChild(newElement);

    return newElement;
}

solve();