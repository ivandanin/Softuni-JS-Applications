import { postTopic, displayTopics } from './create.js';

displayTopics();
document.querySelector('.public').addEventListener('click', postTopic);

document.querySelector('.cancel').addEventListener('click', cancelInputs);