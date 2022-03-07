function solve() {
    let url = 'http://localhost:3030/jsonstore/collections/students';
    let tableBodyElement = document.querySelector('#results tbody');

    fetch(url)
    .then(response => response.json())
    .then(data => {
        Object.values(data).forEach(s => {
            let firstName = s.firstName;
            let lastName = s.lastName;
            let facNumber = s.facultyNumber;
            let grade = Number(s.grade);

            let tableRow = document.createElement('tr');
            
            let firstNameCell = tableRow.insertCell(0);
            firstNameCell.innerText = firstName;

            let lastNameCell = tableRow.insertCell(1);
            lastNameCell.innerText = lastName;

            let facNumberCell = tableRow.insertCell(2);
            facNumberCell.innerText = facNumber;

            let gradeCell = tableRow.insertCell(3);
            gradeCell.innerText = grade;

            tableBodyElement.appendChild(tableRow);
        });
    });

    let submitBtn = document.getElementById('submit');
    submitBtn.addEventListener('click', submitOnClick);

    function submitOnClick(event) {
        event.preventDefault();

        let firstNameInputElement = document.getElementsByName('firstName')[0];
        let lastNameInputElement = document.getElementsByName('lastName')[0];
        let facultyNumberInputElement = document.getElementsByName('facultyNumber')[0];
        let gradeInputElement = document.getElementsByName('grade')[0];


        if (firstNameInputElement !== '' &&
             lastNameInputElement !== '' &&
              facultyNumberInputElement !== '' &&
               gradeInputElement !== '') {


            fetch(url, {
                method: 'POST', 
                headers: {
                    'content-type': 'application/json'
                }, 
                body: JSON.stringify({
                    firstName: firstNameInputElement.value,
                    lastName: lastNameInputElement.value,
                    facultyNumber: facultyNumberInputElement.value,
                    grade: gradeInputElement.value
                })
            });
            let tableRow = document.createElement('tr');
        
            let firstNameCell = tableRow.insertCell(0);
            firstNameCell.innerText = firstNameInputElement.value;

            let lastNameCell = tableRow.insertCell(1);
            lastNameCell.innerText = lastNameInputElement.value;

            let facNumberCell = tableRow.insertCell(2);
            facNumberCell.innerText = facultyNumberInputElement.value;

            let gradeCell = tableRow.insertCell(3);
            gradeCell.innerText = gradeInputElement.value;

            tableBodyElement.appendChild(tableRow);

            firstNameInputElement.value  = '';
            lastNameInputElement.value = '';
            facultyNumberInputElement.value = '';
            gradeInputElement.value = '';
        }
    }
}
solve();