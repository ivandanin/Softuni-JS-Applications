import { edit, getById } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (data, onSubmit) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="editForm">
        <img src="${data.image}">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" id="name" type="text" .value="${data.name}">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" id="breed" type="text" .value="${data.breed}">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" id="age" type="text" .value="${data.age} years">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" id="weight" type="text" .value="${data.weight}kg">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" id="image" type="text" .value="${data.image}">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`;

export async function editPage(context) {
    const data = await getById(context.params.id);
    context.render(editTemplate(data, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        
        const formData = new FormData(event.target);

        const name = formData.get('name');
        const breed = formData.get('breed');
        const age = formData.get('age');
        const weight = formData.get('weight');
        const image = formData.get('image');

        if (name == '' ||
            breed == '' ||
            age == '' ||
            weight == '' ||
            image == '') {
                return alert('Fill all fields');
        }
        await edit(context.params.id, {name, breed, age, weight, image});
        context.page.redirect('/details/' + context.params.id);
    }
}