async function lockedProfile() {
    let mainElement = document.querySelector('main');
    let emptyProfile = document.querySelector('.profile');
    mainElement.removeChild(emptyProfile);

    fetch('http://localhost:3030/jsonstore/advanced/profiles')
    .then(response => {
       return response.json()
    })
    .then(data => {
        for (let el in data) {
            let currProfile = data[el];

            let profileCardDivElement = document.createElement('div');
            profileCardDivElement.classList.add('profile');
            profileCardDivElement.innerHTML = `
            <img src="./iconProfile2.png" class="userIcon" />
            <label>Lock</label> 
            <input type="radio" name="user1Locked" value="lock" checked>
            <label>Unlock</label>
            <input type="radio" name="user1Locked" value="unlock"><br>
            <hr> <label>Username</label> 
            <input type="text" name="user1Username" value="${currProfile.username}" disabled readonly /> 
            <div id="user1HiddenFields"> <hr> 
            <label>Email:</label> <input type="email" name="user1Email" value="${currProfile.email}" disabled readonly />
            <label>Age:</label> <input type="email" name="user1Age" value="${currProfile.username}" disabled readonly />
            </div> <button>Show more</button>`;
           
            mainElement.appendChild(profileCardDivElement);
        }
    });

        
    document.getElementById('main')
    .addEventListener('click', showInfo);
}

function showInfo({target}) {
    
    if (target.tagName === 'BUTTON') {
        let unlocked = target.parentNode.querySelector('input[value="unlock"]');
        
        if (unlocked.checked) {
            let btn = target.parentNode.querySelector('button');
            let btnTxt = btn.textContent;
            let hiddenDiv = target.parentElement.querySelector('div');
            
            switch(btnTxt) {
                case 'Show more':
                    hiddenDiv.style.display = 'block';
                    button.textContent = 'Hide it';
                    break;
                case 'Hide it':
                    hiddenDiv.style.display = 'none';
                    button.textContent = 'Show more';
                    break;
            }
        }
    }
}