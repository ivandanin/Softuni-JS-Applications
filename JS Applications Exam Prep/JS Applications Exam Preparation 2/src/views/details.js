import { deleteById, getById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, isOwner, onDelete) => html`
<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src="${data.imageUrl}">
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${data.brand}</li>
            <li><span>Model:</span>${data.model}</li>
            <li><span>Year:</span>${data.year}</li>
            <li><span>Price:</span>${data.price}$</li>
        </ul
        <p class="description-para">${data.description}</p
        <div class="listings-buttons">
            ${isOwner 
                ? html`<a href="/edit/${data._id}" class="button-list">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>`
                : null}
            
        </div>
    </div>
</section>`;


export async function detailsPage(context) {
    const data = await getById(context.params.id);
    
    const userData = getUserData();
    const isOwner = userData && data._ownerId == userData.id;
    
    context.render(detailsTemplate(data, isOwner, onDelete));

    async function onDelete() {
        const confirmDelete = confirm('sure?');
        if (confirmDelete) {
            await deleteById(context.params.id);
            context.page.redirect('/all-listings');
        }
    }
}