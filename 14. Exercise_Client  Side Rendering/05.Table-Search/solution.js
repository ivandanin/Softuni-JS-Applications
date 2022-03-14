import { html, render } from "../node_modules/lit-html/lit-html.js";

const url = 'http://localhost:3030/jsonstore/advanced/table';

async function getOptions() {
   let response = await fetch(url);
   return await response.json();
}

function solve() {

   document.querySelector('#searchBtn').addEventListener('click', onClick);

   let template = (data) => html`
   ${data.map(el => html`
   <tr id="${el._id}">
      <td>${el.firstName} ${el.lastName}</td>
      <td>${el.email}</td>
      <td>${el.course}</td>
   </tr>`)}`;

   let options = Object.values(getOptions());
   let tBodyElement = document.querySelector('.container tbody');

   update(options);

   function update(options) {
      render(template(options), tBodyElement);
   }

   async function onClick(event) {
      event.preventDefault();

      let trElements = document.querySelectorAll('tbody tr');
      let searchField = document.querySelector('#searchField');

      trElements.forEach(r => r.removeAttribute('class', 'select'));

      if (searchField.value) {
         trElements.forEach(r => {
            if (r.innerHTML.includes(searchField.value)) {
               r.setAttribute('class', 'select');
            }
            update(options);
            searchField.value = '';
         });
      }
   }
}

solve();