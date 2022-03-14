let views = [...document.querySelectorAll('.view-section')];

function hideAll() {
    views.forEach(s => s.style.display = 'none');
}

export function showView(section) {
    hideAll();
    section.style.display = 'block';
}

export function spinner() {
    let element = document.createElement('p');
    element.innerHTML = 'Loading &hellip;';
    return element;
}

export function updateNav() {
    let user = JSON.parse(localStorage.getItem('user'));
    let msgContainer = document.getElementById('welcome-msg');
    if (user) {
        document.querySelectorAll('.user').forEach(e => e.style.display = 'inline-block');
        document.querySelectorAll('.guest').forEach(e => e.style.display = 'none');
        msgContainer.textContent = `Welcome, ${user.email}`;
    } else {
    document.querySelectorAll('.user').forEach(e => e.style.display = 'none');
    document.querySelectorAll('.guest').forEach(e => e.style.display = 'inline-block');
    msgContainer.textContent = '';

    }
}