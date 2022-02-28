async function loadCommits() {
    let usernameElement = document.getElementById('username');
	let repoElement = document.getElementById('repo');
    let ulElement = document.getElementById('commits');

    try {
        let response = await fetch(`https://api.github.com/repos/${usernameElement.value}/${repoElement.value}/commits`)
        let result = await response.json();

        result.forEach(({commit}) => {
            let li = document.createElement('li');
            li.innerHTML = `${commit.author.name}: ${commit.message}`;
            ulElement.appendChild(li);
        });
    }
	catch(error) {
        console.log(error);
    }
}