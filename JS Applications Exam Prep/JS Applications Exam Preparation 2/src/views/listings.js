import { getAll } from "../api/data.js";
import { html } from "../lib.js";


const listingsTemplate = (data) => html`
<section id="car-listings">
            <h1>Car Listings</h1>
            <div class="listings">
            ${data.length == 0 
            ? html`<p class="no-cars">No cars in database.</p>`
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
</div>
`;
export async function listingsPage(context) {
    const data = await getAll();
    context.render(listingsTemplate(data));
}