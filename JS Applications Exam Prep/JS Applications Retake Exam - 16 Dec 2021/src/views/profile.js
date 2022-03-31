import { getMyItems } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const profileTemplate = (data, email) => html`
<section id="profilePage">
    <div class="userInfo">
        <div class="avatar">
            <img src="./images/profilePic.png">
        </div>
        <h2>${email}</h2>
    </div>
    <div class="board">
        ${data.length == 0
            ? html`
                <div class="no-events">
                    <p>This user has no events yet!</p>
                </div>`
            : data.map(profileCard)}
    </div>
</section>`;

const profileCard = (scene) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src="${scene.imageUrl}">
        <h2>${scene.title}</h2>
        <h6>${scene.date}</h6>
        <a href="/details/${scene._id}" class="details-button">Details</a>
    </div>
</div>`;

export async function profilePage(context) {
    const userData = getUserData();
    
    const email = userData.email;
    
    const data = await getMyItems(userData.id);
    context.render(profileTemplate(data, email));
}
