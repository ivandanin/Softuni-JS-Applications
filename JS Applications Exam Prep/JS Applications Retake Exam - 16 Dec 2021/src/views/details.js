import { deleteById, getItemById, getLikesByItemId, getMyLikeByItemId, LikeItem } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, isOwner, likes, onDelete, showLikeBtn, onLike) => html`
<section id="detailsPage">
<div id="detailsBox">
    <div class="detailsInfo">
        <h1>Title: ${data.title}</h1>
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

        ${likeTemplate(showLikeBtn, onLike)}
        </div>
        <p class="likes">Likes: ${likes}</p>
    </div>
</div>
</section>`;

const likeTemplate = (showLikeBtn, onLike) => {
    if (showLikeBtn) {
        return html`<a @click=${onLike} class="btn-like" href="#">Like</a>`;
    } else {
        return null;
    }
}

export async function detailsPage(context) {
    const userData = getUserData();

    const [data, likes, hasLike] = await Promise.all([
        getItemById(context.params.id),
        getLikesByItemId(context.params.id),
        userData ? getMyLikeByItemId(context.params.id, userData.id) : 0
    ]);

    const isOwner = userData && data._ownerId == userData.id;

    const showLikeBtn = userData != null && isOwner == false && hasLike == false;

    context.render(detailsTemplate(data, isOwner, likes, onDelete, showLikeBtn, onLike));

    async function onDelete() {
        const choice = confirm('sure?');
        if (choice) {
            await deleteById(context.params.id);
        }
        context.page.redirect('/profile');
    }
    async function onLike() {
        await LikeItem(context.params.id);
        context.page.redirect('/details/' + context.params.id);
    }
}
