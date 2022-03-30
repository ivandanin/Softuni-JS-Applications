import { search, getAll } from "../api/data.js";
import { html } from "../lib.js";

const filterTemplate = (data, onClick) => html`
<section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${onClick} class="button-list">Search</button>
            </div>
            <h2>Results:</h2>
            <div class="listings">
            ${data.length == 0
        ? html`<p class="no-cars"> No results.</p>`
        : data.map(listingTemplate)}     
            </div>
        </section>`;

const listingTemplate = (car) => html`
<div class="listing">
    <div class="preview">
        <img src="${car.imageUrl}">
    </div>
    <h2>${car.brand} ${car.model}</h2>
    <div class="info">
        <div class="data-info">
            <h3>Year: ${car.year}</h3>
            <h3>Price: ${car.price} $</h3>
        </div>
        <div class="data-buttons">
            <a href="/details/${car._id}" class="button-carDetails">Details</a>
        </div>
    </div>
</div>`;

export async function filterPage(context) {
    context.render(filterTemplate([], onClick));

    async function onClick(event) {
        event.preventDefault();

        const query = Number(document.querySelector('#search-input').value);

        try {
            if (query == '') {
                throw new Error('Enter year in input field');
            }
            if (isNaN(query)) {
                throw new Error('Input must be number');
            }
            if (query < 0) {
                throw new Error('Year must be a positive number');
            }
            const data = await search(query);
            context.render(filterTemplate(data, onClick));

        } catch (error) {
            return alert(error.message);
        }
    }
}