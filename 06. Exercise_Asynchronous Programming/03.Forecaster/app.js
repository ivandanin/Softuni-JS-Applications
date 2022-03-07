function attachEvents() {
    let locationElement = document.getElementById('location');
    let forecastDivElement = document.getElementById('forecast');
    let currentDivElement = document.getElementById('current');
    let upcomingDivElement = document.getElementById('upcoming');

    let submitBtn = document.getElementById('submit');
    let day;

    submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        fetch('http://localhost:3030/jsonstore/forecaster/locations')
        .then(response => {
            forecastDivElement.style.display = 'block'
            return response.json();
        })
        .then(data => {
            day = data.find(e => e.name == locationElement.value);

            fetch(`http://localhost:3030/jsonstore/forecaster/today/${day.code}`)
            .then(response => response.json())
            .then(data => {
                let forecast = data.forecast;
                let locationName = data.name;
                
                let divElement = document.createElement('div');
                divElement.classList.add('forecast-info');
                
                let iconSpanElement = document.createElement('span');
                iconSpanElement.classList.add('condition');
                iconSpanElement.classList.add('symbol');
                
                switch (forecast.condition) {
                    case 'Sunny':
                        iconSpanElement.innerHTML = `&#x2600;`;
                        break;
                    case 'Partly sunny':
                        iconSpanElement.innerHTML = `&#x26C5;`;
                        break;
                    case 'Overcast':
                        iconSpanElement.innerHTML = `&#x2601;`;
                        break;
                    case 'Rain':
                        iconSpanElement.innerHTML = `&#x2614;`;
                        break;
                }
                
                divElement.appendChild(iconSpanElement);
                
                let conditionSpanElement = document.createElement('span');
                conditionSpanElement.classList.add('condition');
                
                let locationSpanElement = document.createElement('span');
                locationSpanElement.textContent = locationName;
                locationSpanElement.classList.add('forecast-data');
                
                conditionSpanElement.appendChild(locationSpanElement);
                
                let degreesSpanElement = document.createElement('span');
                degreesSpanElement.innerHTML = `${forecast.low}${'&#176;'}/${forecast.high}${'&#176;'}`;
                degreesSpanElement.classList.add('forecast-data');
                
                let locationConditionElement = document.createElement('span');
                locationConditionElement.textContent = forecast.condition;
                locationConditionElement.classList.add('forecast-data');
                
                conditionSpanElement.appendChild(locationConditionElement);
                divElement.appendChild(conditionSpanElement);
                currentDivElement.appendChild(divElement);
            });

            fetch(`http://localhost:3030/jsonstore/forecaster/upcoming/${day.code}`)
                    .then(res => res.json())
                    .then(data => {
                        let forecast = data.forecast;
 
                        let divElement = document.createElement('div');
                        divElement.classList.add('forecast-info');
 
                        for (let i = 0; i < 3; i++) {
                            let forecastInfoDivElement = document.createElement('span');
                            forecastInfoDivElement.classList.add('upcoming');

                            let iconSpanElement = document.createElement('span');
 
                            switch (forecast[i].condition) {
                                case 'Sunny':
                                    iconSpanElement.innerHTML = `&#x2600;`;
                                    break;
                                case 'Partly sunny':
                                    iconSpanElement.innerHTML = `&#x26C5;`;
                                    break;
                                case 'Overcast':
                                    iconSpanElement.innerHTML = `&#x2601;`;
                                    break;
                                case 'Rain':
                                    iconSpanElement.innerHTML = `&#x2614;`;
                                    break;
                            }
                            iconSpanElement.classList.add('symbol');
                            forecastInfoDivElement.appendChild(iconSpanElement);
 
                            let degreesSpanElement = document.createElement('span');
                            degreesSpanElement.classList.add('forecast-data');
                            degreesSpanElement.innerHTML = `${forecast[i].low}${'&#176;'}/${forecast[i].high}${'&#176;'}`;
 
                            forecastInfoDivElement.appendChild(degreesSpanElement);
 
                            let locationConditionElement = document.createElement('span');
                            locationConditionElement.classList.add('forecast-data');
                            locationConditionElement.textContent = forecast[i].condition;
 
                            forecastInfoDivElement.appendChild(locationConditionElement);
 
                            divElement.appendChild(forecastInfoDivElement);
                        }
                        upcomingDivElement.appendChild(divElement);
                    });
        });
    });
}

attachEvents();