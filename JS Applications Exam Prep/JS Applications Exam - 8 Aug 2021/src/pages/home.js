import { html } from "../../node_modules/lit-html/lit-html.js";

let bookTemplate = (book) => html`
<li class="otherBooks">
    <h3>${book.title}</h3>
    <p>Type: ${book.type}</p>
    <p class="img"><img src="${book.imageUrl}"></p>
    <a class="button" href="${'/details/' + book._id}">Details</a>
</li>`;

let dashboardTemplate = (books) => html`
<section id="dashboard-page" class="dashboard">
    <h1>Dashboard</h1>
    <!-- Display ul: with list-items for All books (If any) -->
    <ul class="other-books-list">
        ${books.length > 0 
            ? books.map(bookTemplate) 
            : html`<p class="no-books">No books in database!</p>`}
    </ul>
</section>`;

export async function dashboardView(context) {
    let response = await fetch('http://localhost:3030/data/books?sortBy=_createdOn%20desc');
    let data = await response.json();
    context.render(dashboardTemplate(data));
}