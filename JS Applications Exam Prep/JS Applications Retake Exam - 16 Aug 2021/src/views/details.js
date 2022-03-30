import { getItemById, deleteById } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, isOwner, onDelete) => html`
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
        <div class="buttons">
        ${isOwner
            ? html`<a href="/edit/${data._id}" class="button">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)"">Delete</a>`
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
        const choice = confirm('Are u sure?');

        if (choice) {
            await deleteById(context.params.id);
            context.page.redirect('/');
        }
    }
}

// const commentTemplate = () => html`
// <!-- Bonus ( for Guests and Users ) -->
// <div class="details-comments">
//     <h2>Comments:</h2>
//     <ul>
//         <!-- list all comments for current game (If any) -->
//         <li class="comment">
//             <p>Content: I rate this one quite highly.</p>
//         </li>
//         <li class="comment">
//             <p>Content: The best game.</p>
//         </li>
//     </ul>
//     <!-- Display paragraph: If there are no games in the database -->
//     <p class="no-comment">No comments.</p>
//     </div>

// <!-- Bonus -->
// <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
// <article class="create-comment">
//     <label>Add new comment:</label>
//     <form class="form">
//         <textarea name="comment" placeholder="Comment......"></textarea>
//         <input class="btn submit" type="submit" value="Add Comment">
//     </form>
// </article>`;