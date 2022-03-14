import { html, render } from "../node_modules/lit-html/lit-html.js";

document.getElementById('btnLoadTowns').addEventListener('click', getTowns);

let listTemplate = (data) => html`
<ul>
    ${data.map(town => html`<li>${town}</li>`)}
</ul>`;


function getTowns(event) {
    event.preventDefault();

    if( document.getElementById('towns').value !== '') {
        let root = document.getElementById('root');
        let towns = document.getElementById('towns').value.split(', ');

        let ul = document.createElement('ul');

        let result = listTemplate(towns);
        render(result, root);

        root.appendChild(ul);
    }
}