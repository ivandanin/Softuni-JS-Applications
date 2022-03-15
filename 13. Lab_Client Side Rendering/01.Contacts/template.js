import { html } from '../node_modules/lit-html/lit-html.js';
import { showDetails } from './visualize.js';

export let template = (data) => html`
    <div class="contact card">
        <div>
            <i class="far fa-user-circle gravatar"></i>
        </div>
        <div class="info">
            <h2>Name: ${data.name}</h2>
            <button @click=${showDetails} class="detailsBtn">Details</button>
            <div class="details" id="${data.id}">
                <p>Phone number: ${data.phoneNumber}</p>
                <p>Email: ${data.email}</p>
            </div>
        </div>
    </div>`;
 