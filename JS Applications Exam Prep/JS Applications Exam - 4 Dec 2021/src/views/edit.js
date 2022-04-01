import { editItem, getItemById } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (data, onSubmit) => html`
<section class="editPage">
<form @submit=${onSubmit}>
    <fieldset>
        <legend>Edit Album</legend>

        <div class="container">
            <label for="name" class="vhide">Album name</label>
            <input id="name" name="name" class="name" type="text" .value="${data.name}">
            <label for="imgUrl" class="vhide">Image Url</label>.
            <input id="imgUrl" name="imgUrl" class="imgUrl" type="text" .value="${data.imgUrl}">

            <label for="price" class="vhide">Price</label>
            <input id="price" name="price" class="price" type="text" .value="${data.price}">

            <label for="releaseDate" class="vhide">Release date</label>
            <input id="releaseDate" name="releaseDate" class="releaseDate" type="text" .value="${data.releaseDate}">

            <label for="artist" class="vhide">Artist</label>
            <input id="artist" name="artist" class="artist" type="text" .value="${data.artist}">

            <label for="genre" class="vhide">Genre</label>
            <input id="genre" name="genre" class="genre" type="text" .value="${data.genre}">

            <label for="description" class="vhide">Description</label>
            <textarea name="description" class="description" rows="10"cols="10">${data.description}</textarea>

            <button class="edit-album" type="submit">Edit Album</button>
        </div>
    </fieldset>
</form>
</section>`;

export async function editPage(context) {
    const data = await getItemById(context.params.id);
    context.render(editTemplate(data, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const name = formData.get('name');
        const imgUrl = formData.get('imgUrl');
        const price = Number(formData.get('price'));
        const releaseDate = formData.get('releaseDate');
        const artist = formData.get('artist');
        const genre = formData.get('genre');
        const description = formData.get('description');

        if (name == '' || imgUrl == '' ||
             price == '' || releaseDate == '' ||
              artist == '' || genre == '' || description == '') {
                return alert('fill all fields');
        }
        if (price < 0) {
            return alert('price must be positive number');
        }

        await editItem(context.params.id, 
            {name, imgUrl,
                 price, releaseDate,
                  artist, genre, description
            }
        );
        context.page.redirect('/details/' + context.params.id);
    }
} 