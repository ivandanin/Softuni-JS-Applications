import { html, render } from "../node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/table';

let template = (data) => html`
${data.map(el => html`
<tr id="${el._id}">
<td>${el.firstName} ${el.lastName}</td>
<td>${el.email}</td>
<td>${el.course}</td>
</tr>`)}`;

let options = Object.values(await getOptions());
let tBodyElement = document.querySelector('.container tbody');

async function getOptions() {
   const response = await fetch(url);
   return await response.json();
}

async function update() {
   render(template(options), tBodyElement);
}


function solve() {
   
   document.querySelector('#searchBtn').addEventListener('click', onClick);
   
   async function onClick(event) {
      event.preventDefault();

      let trElements = document.querySelectorAll('tbody tr');
      let searchField = document.querySelector('#searchField');

      for (const row of trElements) {
         row.removeAttribute('class', 'select');
      }
      if (searchField.value) {
         for (const row of trElements) {
            if (row.innerHTML.includes(searchField.value)) {
            row.setAttribute('class', 'select');
         }
      }
   }
   searchField.value = '';
}
}
update();
solve();