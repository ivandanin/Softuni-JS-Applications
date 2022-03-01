function getInfo() {
    let inputElement = document.getElementById('stopId');
    let stopElement = document.getElementById('stopName');
    let busElement = document.getElementById('buses');
    let submitBtn = document.getElementById('submit');

    let url = `http://localhost:3030/jsonstore/bus/businfo/${inputElement.value}`;

    stopElement.textContent = 'Loading...';

    busElement.replaceChildren();
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        stopElement.textContent = data.name;
        Object.entries(data.buses).forEach(bus => {
            let busLiElement = document.createElement('li');
            busLiElement.textContent = `Bus ${bus[0]} arrives in ${bus[1]} minutes`;
            busElement.appendChild(busLiElement);
        });
    }) 
    .catch(error => {
    stopElement.textContent = 'Error';

    });
}