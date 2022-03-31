import { getItemById, deleteById, getComments, createComment } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, comments, isOwner, onDelete, onSubmit, isLogged) => html`
<section id="game-details">
    <h1>Game Details</h1>
    <div class="info-section">
        <div class="game-header">
            <img class="game-img" src="${data.imageUrl}" />
            <h1>${data.title}</h1>
            <span class="levels">MaxLevel: ${data.maxLevel}</span>
            <p class="type">${data.category}</p>
        </div>
        <p class="text">${data.summary}</p>

        ${commentTemplate(comments)}

        <div class="buttons">
        ${isOwner
            ? html`<a href="/edit/${data._id}" class="button">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)"">Delete</a>`
            : null}
        </div>

        ${isLogged && !isOwner
            ? html`
            <article class="create-comment">
                <label>Add new comment:</label>
                <form @submit=${onSubmit} id="${data._id}" class="form">
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>`
            : null}
    </div>
</section>`;

const commentTemplate = (comments) => html`
<!-- Bonus ( for Guests and Users ) -->
<div class="details-comments">
    <h2>Comments:</h2>
    <ul>
        ${comments.length == 0
            ? html`<p class="no-comment">No comments.</p>`
            : html`${comments.map(comment => {
                return html`
                <li class="comment">
                    <p>Content: ${comment.comment}</p>
                </li>`})
            }`
        } 
    </ul>
</div>`;


export async function detailsPage(context) {
    const [data, comments] = await Promise.all([
        getItemById(context.params.id),
        getComments(context.params.id)
    ]);

    const userData = getUserData();
    const isLogged = userData;
    const isOwner = userData && data._ownerId == userData.id;

    context.render(detailsTemplate(data, comments, isOwner, onDelete, onSubmit, isLogged));

    async function onDelete() {
        const choice = confirm('Are u sure?');

        if (choice) {
            await deleteById(context.params.id);
            context.page.redirect('/');
        }
    }

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);
        const comment = formData.get('comment');
        const gameId = event.target.id;

        if (comment == '') {
            return alert('fill message');
        }

        await createComment({comment, gameId});
        context.page.redirect('/details/' + gameId);
    }
}


