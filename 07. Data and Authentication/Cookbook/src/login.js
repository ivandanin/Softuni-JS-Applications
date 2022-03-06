    let form = document.querySelector('form');

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let formData = new FormData(event.currentTarget);
    
        let email = formData.get('email');
        let password = formData.get('password');
    
        fetch('http://localhost:3030/users/login', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'},
            body: JSON.stringify(
                {email, password})
        })
        .then(response => response.json())
        .then(user => {
            console.log(user);
            localStorage.setItem('_id', user._id);
            localStorage.setItem('username', user.username);
            localStorage.setItem('accessToken', user.accessToken);
            location.href = 'index.html';

        });
    });
