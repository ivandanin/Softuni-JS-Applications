import { edit, getById } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (data, onSubmit) => html`
<section id="edit-listing">
    <div class="container">
    <form @submit=${onSubmit} id="edit-form">
            <h1>Edit Car Listing</h1>
            <p>Please fill in this form to edit an listing.</p>
            <hr
            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand" .value="${data.brand}"
            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model" .value="${data.model}"
            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description" .value="${data.description}"
            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year" .value="${data.year}"
            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl" .value="${data.imageUrl}"
            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price" .value="${data.price}"
            <hr>
            <input type="submit" class="registerbtn" value="Edit Listing">
        </form>
    </div>
</section>`;

export async function editPage(context) {
    const data = await getById(context.params.id);
    context.render(editTemplate(data, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const brand = formData.get('brand');
        const model = formData.get('model');
        const description = formData.get('description');
        const year = formData.get('year');
        const imageUrl = formData.get('imageUrl');
        const price = formData.get('price');

        if (brand == '' ||
        model == '' ||
        description == '' ||
        year == '' ||
        imageUrl == '' ||
        price == '') {
            return alert('fill all fields');
        }

        if (price < 0) {
            return alert('price must be positive number');
        }

        if (year < 0 ) {
            return alert('the year is not real');
        }


        await edit(context.params.id, {
            brand, model, description, year, imageUrl, price
        });
        context.page.redirect('/details/' + context.params.id);
    }
}