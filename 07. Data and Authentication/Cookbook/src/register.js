let form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    let formData = new FormData(event.currentTarget);

    let email = formData.get('email');
    let password = formData.get('password');
    let rePassword = formData.get('rePass');

    fetch('http://localhost:3030/users/register', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        }, 
        body: JSON.stringify({
            email, 
            password
        })    
    })
    .then(response => response.json())
    .then(user => {
        localStorage.setItem('accessToken', user.accessToken);
        location.href = 'index.html';
    });
});