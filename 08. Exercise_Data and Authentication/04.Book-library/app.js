let tableBodyElement = document.querySelector('#loadBooks tbody');

function solve() {
    document.querySelector('loadBooks').addEventListener('click', getAllBooks);

}

function getAllBooks(event) {
    event.preventDefault();

    fetch('http://localhost:3030/jsonstore/collections/books')
    .then(response => response.json())
    .then(data => {
        Object.entries(data).forEach()
    })
}

function createElement(type, text, appender) {
    let newElement = document.createElement(type);
    newElement.textContent = text;
    appender.appendChild(newElement);

    return newElement;
}

solve;