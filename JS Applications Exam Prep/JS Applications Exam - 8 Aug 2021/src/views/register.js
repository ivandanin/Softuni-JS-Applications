import { register } from "../api/api.js";
import { html } from "../lib.js";

const registerTemplate = (onSubmit) => html`
<section id="register-page" class="register">
    <form @submit=${onSubmit} id="register-form" action="" method="">
        <fieldset>
            <legend>Register Form</legend>
            <p class="field">
                <label for="email">Email</label>
                <span class="input">
                    <input type="text" name="email" id="email" placeholder="Email">
                </span>
            </p>
            <p class="field">
                <label for="password">Password</label>
                <span class="input">
                    <input type="password" name="password" id="password" placeholder="Password">
                </span>
            </p>
            <p class="field">
                <label for="repeat-pass">Repeat Password</label>
                <span class="input">
                    <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                </span>
            </p>
            <input class="button submit" type="submit" value="Register">
        </fieldset>
    </form>
</section>`;


export function registerPage(context) {
    context.render(registerTemplate(onSubmit));

    
    async function onSubmit(event) {
        event.preventDefault();
        const formData = new FormData(event.target);

        const email = formData.get('email');
        const password = formData.get('password');
        const repeatPass = formData.get('confirm-pass');

        if ( email == '' || password == '') {
            return alert('all fields are required!');
            // return notify('all fields are required!');
        }
        if (password != repeatPass) {
            return alert('passwords do not match')
            // return notify('passwords do not match')
        }

        await register(email, password);
        context.updateUserNav();
        context.page.redirect('/');
    }
}
