let url = 'http://localhost:3030/jsonstore/phonebook';
let phonebookUlElement = document.getElementById('phonebook');
let person = document.getElementById('person');
let phone = document.getElementById('phone');

function attachEvents() {

    document.getElementById('btnLoad').addEventListener('click', loadPhones);
    document.getElementById('btnCreate').addEventListener('click', createPhone);
}

function loadPhones() {
    phonebookUlElement.innerHTML = '';
    fetch(url)
    .then(response => {
        return response.json()
    })
    .then(data => {
        Object.values(data).forEach(p => {
            let {person, phone, _id} = p;
            let liElement = createElement('li', `${person}: ${phone}`, phonebookUlElement);
            liElement.setAttribute('id', _id);

            let deleteBtn = createElement('button', 'Delete', liElement);
            deleteBtn.setAttribute('id', 'deleteBtn');
            deleteBtn.addEventListener('click', deletePhone);
        });
    });


}

function createElement(type, text, appender) {
    let newElement = document.createElement(type);
    newElement.textContent = text;
    appender.appendChild(newElement);

    return newElement;
}

function deletePhone(event) {
    let id = event.target.parentNode.id;
    event.target.parentNode.remove();

    fetch(`${url}/${id}`, {
        method: 'DELETE'
    });
}

function createPhone() {
    if (person.value && phone.value) {
        fetch(url, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            }, 
            body: JSON.stringify({person:person.value, phone:phone.value})
        })
        .then(response => response.json())
        .then(data => {
            document.getElementById('btnLoad').click();
            person.value = '';
            phone.value = '';
        })
    }
}

attachEvents();