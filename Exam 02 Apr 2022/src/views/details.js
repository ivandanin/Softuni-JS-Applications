import { deleteById, getById, getDonateById, getMyDonateById, donateDollar } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, isOwner, deleteCard, donates, showBtn, onDonate) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src="${data.image}">
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${data.name}</h1>
                <h3>Breed: ${data.breed}</h3>
                <h4>Age: ${data.age} years</h4>
                <h4>Weight: ${data.weight}kg</h4>
                <h4 class="donation">Donation: ${donates * 100}$</h4>
            </div>
            
                <div class="actionBtn">
                    ${isOwner
                        ? html`<a href="/edit/${data._id}" class="edit">Edit</a>
                            <a @click=${deleteCard} href="javascript:void(0)" class="remove">Delete</a>`
                        : null}
                    
                    ${donateTemplate(showBtn, onDonate)}
                </div>
        </div>
    </div>
</section>`;

const donateTemplate = (showBtn, onDonate) => {
    if (showBtn) {
        return html`<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`;
    } else {
        return null;
    }
}

export async function detailsPage(context) {
    const userData = getUserData();
    
    const [data, donates, hasDonated] = await Promise.all([
        await getById(context.params.id),
        await getDonateById(context.params.id),
        userData ? getMyDonateById(context.params.id, userData.id) : 0
    ]);

    const isOwner = userData && userData.id == data._ownerId;
    const showBtn = userData != null && isOwner == false && hasDonated == false;

    context.render(detailsTemplate(data, isOwner, deleteCard, donates, showBtn, onDonate));

    async function deleteCard() {
        const confirmDelete = confirm('Do you really want to delete this card?');
        
        if(confirmDelete) {
            await deleteById(context.params.id);
            context.page.redirect('/dashboard');
        }
    }

    async function onDonate() {
        await donateDollar(context.params.id);
        context.page.redirect('/details/' + context.params.id);
    }
}