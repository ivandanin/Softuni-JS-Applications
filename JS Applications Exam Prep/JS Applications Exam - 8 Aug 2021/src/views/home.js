import { html } from "../lib.js";
import {getAllBooks} from '../api/data.js';

let bookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="/details/${book._id}">Details</a>
</li>`;

let dashboardTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    ${books.length > 0 
        ? html `<ul class="other-books-list">
            ${books.map(bookTemplate)}
            </ul>`
        : html`<p class="no-books">No books in database!</p>`}
</section>`;

export async function homePage(context) {
    const books = await getAllBooks();
    context.render(dashboardTemplate(books));
}