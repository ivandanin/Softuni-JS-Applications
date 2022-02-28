async function loadRepos() {
	let inputElement = document.getElementById('username');
	let ulElement = document.getElementById('repos');
	
	let data = await fetch(`https://api.github.com/users/${inputElement.value}/repos`);
	let response = await data.json();

	ulElement.innerHTML = '';

	response.forEach(({full_name, html_url}) => {
		let li = document.createElement('li');
		let a = document.createElement('a');
		a.innerHTML = full_name;
		a.href = html_url;

		li.appendChild(a);
		ulElement.appendChild(li);
	});
}