import { editBook, getBookById } from "../api/data.js";
import { html } from "../lib.js";

const editTemplate = (book, onSubmit) => html`
<section id="edit-page" class="edit">
<form @submit=${onSubmit} id="edit-form" action="#" method="">
    <fieldset>
        <legend>Edit my Book</legend>
        <p class="field">
            <label for="title">Title</label>
            <span class="input">
                <input type="text" name="title" id="title" .value="${book.title}">
            </span>
        </p>
        <p class="field">
            <label for="description">Description</label>
            <span class="input">
                <textarea name="description"
                    .value="${book.description}"
                    id="description">Feyre's survival rests upon her ability to hunt and kill – the forest where she lives is a cold, bleak place in the long winter months. So when she spots a deer in the forest being pursued by a wolf, she cannot resist fighting it for the flesh. But to do so, she must kill the predator and killing something so precious comes at a price ...</textarea>
            </span>
        </p>
        <p class="field">
            <label for="image">Image</label>
            <span class="input">
                <input type="text" name="imageUrl" id="image" .value="${book.imageUrl}">
            </span>
        </p>
        <p class="field">
            <label for="type">Type</label>
            <span class="input">
                <select id="type" name="type" value="Fiction">
                    <option value="Fiction" selected>Fiction</option>
                    <option value="Romance">Romance</option>
                    <option value="Mistery">Mistery</option>
                    <option value="Classic">Clasic</option>
                    <option value="Other">Other</option>
                </select>
            </span>
        </p>
        <input class="button submit" type="submit" value="Save">
    </fieldset>
</form>
</section>`;

export async function editPage(context) {
    const book = await getBookById(context.params.id);
   context.render(editTemplate(book, onSubmit));

   async function onSubmit(event) {
       event.preventDefault();
       const formData = new FormData(event.target);

       const title = formData.get('title');
       const description = formData.get('description');
       const imageUrl = formData.get('imageUrl');
       const type = formData.get('type');

        if (title == '' || description == '' || imageUrl == '') {
            return alert('All fields are required!');
            // return notify('All fields are required!');
        }

       await editBook(context.params.id, {
           title, 
           description, 
           imageUrl,
           type
       });
       context.page.redirect('/');
   }
}