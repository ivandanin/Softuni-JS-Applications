import { search } from "../api/data.js";
import { html } from "../lib.js";
import { getUserData } from "../util.js";

const searchTemplate = (onClick, data) => html`
<section id="searchPage">
    <h1>Search by Name</h1>
    <div class="search">
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${onClick} class="button-list">Search</button>
    </div>
    <h2>Results:</h2>
    <!--Show after click Search button-->
    <div class="search-result">
        ${data
            ? data.length == 0
                ? html`<p class="no-result">No result.</p>`
                : data.map(cardBox)
            : null
        }
    </div>
</section>`;

const cardBox = (album) => html`
<div class="card-box">
   <img src="${album.imgUrl}">
   <div>
       <div class="text-center">
           <p class="name">Name: ${album.name}</p>
           <p class="artist">Artist: ${album.artist}</p>
           <p class="genre">Genre: ${album.genre}</p>
           <p class="price">Price: $${album.price}</p>
           <p class="date">Release Date: ${album.releaseDate}</p>
       </div>
       ${(getUserData())
           ? html`
               <div class="btn-group">
                   <a href="/details/${album._id}" id="details">Details</a>
               </div>`
           : null
       }
   </div>
</div>`;

export async function searchPage(context) {
    context.render(searchTemplate(onClick));

    async function onClick(event) {
        event.preventDefault();
        const query = document.getElementById('search-input').value;
        try {
            if (query == '') {
                throw new Error('Enter album in input field');
            }

        const data = await search(query);
        context.render(searchTemplate(onClick, data));
        } catch(error) {
            return alert(error.message);
        }
    }
}