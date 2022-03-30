import { editItem, getItemById } from "../api/data.js";
import { html } from "../lib.js";


const editTemplate = (data, onSubmit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onSubmit} id="edit">
        <div class="container">

            <h1>Edit Game</h1>
            <label for="leg-title">Legendary title:</label>
            <input type="text" id="title" name="title" .value="${data.title}">

            <label for="category">Category:</label>
            <input type="text" id="category" name="category" .value="${data.category}">

            <label for="levels">MaxLevel:</label>
            <input type="number" id="maxLevel" name="maxLevel" min="1" .value="${data.maxLevel}">

            <label for="game-img">Image:</label>
            <input type="text" id="imageUrl" name="imageUrl" .value="${data.imageUrl}">

            <label for="summary">Summary:</label>
            <textarea name="summary" id="summary" .value="${data.summary}"></textarea>
            <input class="btn submit" type="submit" value="Edit Game">

        </div>
    </form>
</section>`;

export async function editPage(context) {
    const data = await getItemById(context.params.id);
    context.render(editTemplate(data, onSubmit));

    async function onSubmit(event) {
        event.preventDefault();

        const formData = new FormData(event.target);

        const title = formData.get('title');
        const category = formData.get('category');
        const maxLevel = formData.get('maxLevel');
        const imageUrl = formData.get('imageUrl');
        const summary = formData.get('summary');

        if (title == '' ||
        category == '' ||
        maxLevel == '' ||
        imageUrl == '' ||
        summary == '') {
            return alert('fill all fields');
        }

        await editItem(context.params.id, 
            {title, category, maxLevel, imageUrl, summary});

        context.page.redirect('/');
    }
}