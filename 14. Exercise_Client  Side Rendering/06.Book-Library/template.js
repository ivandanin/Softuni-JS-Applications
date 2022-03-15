import { html } from "../node_modules/lit-html/lit-html.js";
import {loadAllBooks} from './display.js';

export let template = () => html`
<body>
    <button id="loadBooks" @click=${loadAllBooks}>LOAD ALL BOOKS</button>
    <table>
        <thead>
            <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>

        </tbody>
    </table>
</body>`;

export let templateRow = (data) => {
    return html`
    ${Object.entries(data).map((info) => html`
    <tr id="${info[0]}">
    <td>${info[1].title}</td>
    <td>${info[1].author}</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>
</tr>
<tr>
    <td>Game of Thrones</td>
    <td>George R. R. Martin</td>
    <td>
        <button>Edit</button>
        <button>Delete</button>
    </td>
</tr>`)}
`;}