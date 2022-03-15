import { render } from '../node_modules/lit-html/lit-html.js';
import { contacts } from './contacts.js'
import { template } from './template.js';

const contactsContainer = document.getElementById('contacts');
const result = contacts.map(template);

render(result, contactsContainer);