function solve() {

    let infoElement = document.querySelector('#info span');
    let controlsElement = document.getElementById('controls');
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');

    let stop = {
        next: 'depot'
    };

    function depart() {
        let url = `http://localhost:3030/jsonstore/bus/schedule/${stop.next}`;

        fetch(url)
        .then(response => response.json())
        .then(data => {
            stop = data;
            infoElement.textContent = `Next stop ${stop.name}`;
        });

        departBtn.disabled = true;
        arriveBtn.disabled = false;
    }

    function arrive() {
    
        infoElement.textContent = `Arriving at ${stop.name}`;


        departBtn.disabled = false;
        arriveBtn.disabled = true;
    }

    return {
        depart,
        arrive
    };
}

let result = solve();