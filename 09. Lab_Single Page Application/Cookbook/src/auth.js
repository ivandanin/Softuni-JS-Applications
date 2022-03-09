let guestNavigation = document.querySelector('#guest');
let userNavigation = document.querySelector('#user');


export function updateAuth() {
    let serializedUser = localStorage.getItem('user');

    if (serializedUser) {
        // let user = JSON.parse(serializedUser);
        guestNavigation.style.display = 'none';
        userNavigation.style.display = 'inline';
    } else {
        
        guestNavigation.style.display = 'inline';
        userNavigation.style.display = 'none';
    }
}

export function renderLogout() {
    localStorage.removeItem('user');
    updateAuth();
    alert('Bye!');
}

export function getToken() {
    let serializedUser = localStorage.getItem('user');

    if (serializedUser) {
        let user = JSON.parse(serializedUser);

        return user.accessToken;
    }
}