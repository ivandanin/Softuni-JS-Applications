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