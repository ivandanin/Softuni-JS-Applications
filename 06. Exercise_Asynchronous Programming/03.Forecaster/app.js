function attachEvents() {
    let locationElement = document.getElementById('location').value;
    let submitBtn = document.getElementById('submit');

    let forecast = document.getElementById('forecast');
    let currentWeather = document.getElementById('current');
    let upcomingWeather = document.getElementById('upcoming');

    

    submitBtn.addEventListener('click', () => {
        
        if (locationElement.value) {
        let url = 'http://localhost:3030/jsonstore/forecaster/locations';
        
        fetch(url)
        .then(response => response.json())
        .then(data => {

            return data.find(c => c.name.toLowerCase() == locationElement.toLowerCase()).code;
        })
    }
    });
}

attachEvents();