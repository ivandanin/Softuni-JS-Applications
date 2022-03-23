import { deleteById, getBookById, getLikesByBookId, getMyLikeByBookId, LikeBook } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (book, isOwner, onDelete, likes, showLikeBtn, onLike) => html`
<section id="details-page" class="details">
    <div class="book-information">
        <h3>${book.title}</h3>
        <p class="type">Type: ${book.type}</p>
        <p class="img"><img src="${book.imageUrl}"></p>
        <div class="actions">
        ${isOwner 
            ? html` <a class="button" href="/edit/${book._id}">Edit</a>
            <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a> `
            : null
        }
            ${likeTemplate(showLikeBtn, onLike)}
            <div class="likes">
                <img class="hearts" src="/images/heart.png">
                <span id="total-likes">Likes: ${likes}</span>
            </div>
        </div>
    </div>
    <div class="book-description">
        <h3>Description:</h3>
        <p>${book.description}</p>
    </div>
</section>`;

const likeTemplate = (showLikeBtn, onLike) =>{
    if (showLikeBtn) {
        html`<a @click=${onLike} class="button" href="javascript:void(0)">Like</a>`
    } else {
        return null;
    }
}    

export async function detailsPage(context) {
    const userData = getUserData();
    const [book, likes, hasLike] = await Promise.all([
        getBookById(context.params.id),
        getLikesByBookId(context.params.id),
        userData ? getMyLikeByBookId(context.params.id, userData.id) : 0
    ]);

    const isOwner = userData && book._ownerId == userData.id;

    const showLikeBtn =  userData != null && isOwner == false && hasLike == false;

    context.render(detailsTemplate(book, isOwner, onDelete, likes, showLikeBtn, onLike));

    async function onDelete() {
        const choice = confirm('Are u sure?');

        if (choice) {
            await deleteById(context.params.id);
            context.page.redirect('/');
        }
    }

    async function onLike() {
        await LikeBook(context.params.id);
        context.page.redirect('/details/' + context.params.id);
    }
}