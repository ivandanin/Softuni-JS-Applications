import { getItemById, deleteById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${data.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">
                <h1>Name: ${data.name}</h1>
                <h3>Artist: ${data.artist}</h3>
                <h4>Genre: ${data.genre}</h4>
                <h4>Price: $${data.price}</h4>
                <h4>Date: ${data.date}</h4>
                <p>Description: ${data.description}</p>
            </div>
            ${isOwner
            ? html`
                <div class="actionBtn">
                    <a href="/edit/${data._id}" class="edit">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                </div>`
            : null}
        </div>
    </div>
</section>`;

export async function detailsPage(context) {
    const data = await getItemById(context.params.id);
    const userData = getUserData();

    const isOwner = userData && data._ownerId == userData.id;

    context.render(detailsTemplate(data, isOwner, onDelete));

    async function onDelete() {
        const confirmDelete = confirm('sure?');
        if (confirmDelete) {
            await deleteById(context.params.id);
            context.page.redirect('/catalog');
        }
    }
}