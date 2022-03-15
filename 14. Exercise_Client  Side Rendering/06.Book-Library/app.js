import { render } from "../node_modules/lit-html/lit-html.js";
import {template} from './template.js'

let body = document.querySelector('body');

render(template, body);