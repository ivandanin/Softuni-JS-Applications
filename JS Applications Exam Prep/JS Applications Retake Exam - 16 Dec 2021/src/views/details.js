import { deleteById, getItemById, getLikesByItemId } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";
const detailsTemplate = (data, isOwner, likes, onDelete) => html`
<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: Moulin Rouge! - The Musical</h1>
        <div>
            <img src="${data.imageUrl}" />
        </div>
    </div>

    <div class="details">
        <h3>Theater Description</h3>
        <p>${data.description}</p>
        <h4>Date: ${data.date}</h4>
        <h4>Author: ${data.author}</h4>
        <div class="buttons">
        ${isOwner
            ? html`
            <a @click=${onDelete} class="btn-delete" href="javascript:void(0)">Delete</a>
            <a class="btn-edit" href="/edit/${data._id}">Edit</a>`
            : null}


        </div>
        <p class="likes">Likes: ${likes}</p>
    </div>
</div>
</section>`;

const likeBtn = () => html`<a class="btn-like" href="#">Like</a>`;

export async function detailsPage(context) {
    const data = await getItemById(context.params.id);
    const likes = await getLikesByItemId(context.params.id);

    const isOwner = getUserData() && data._ownerId == getUserData().id;
    context.render(detailsTemplate(data, isOwner, likes, onDelete));

    async function onDelete() {
        const choice = confirm('sure?');
        if (choice) {
            await deleteById(context.params.id);
        }
        context.page.redirect('/profile');
    }
}