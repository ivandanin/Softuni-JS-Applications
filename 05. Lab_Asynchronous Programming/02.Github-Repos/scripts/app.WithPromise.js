function loadRepos() {
	let inputElement = document.getElementById('username');
	let ulElement = document.getElementById('repos');
	
    fetch(`https://api.github.com/users/${inputElement.value}/repos`)
    .then(response => 
        response.json())
    .then(result => {
        ulElement.innerHTML = '';
        
        result.forEach(({full_name, html_url}) => {
            let li = document.createElement('li');
            let a = document.createElement('a');

            a.innerHTML = full_name;
            a.href = html_url;

            li.appendChild(a);
            ulElement.appendChild(li);
            });
        })
	.catch(error => console.log(error));
}