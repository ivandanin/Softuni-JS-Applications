import { render } from "../node_modules/lit-html/lit-html.js";
import { templateRow } from "./template.js";

const url = 'http://localhost:3030/jsonstore/collections/books';

export async function loadAllBooks() {

    let tBody = document.querySelector('tbody');
    
    const response = await fetch(url);
    const data = await response.json();
    
    render(templateRow(Object.entries(data)), tBody);
}