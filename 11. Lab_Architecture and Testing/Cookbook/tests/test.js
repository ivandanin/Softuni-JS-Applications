const {chromium} = require('playwright-chromium');
const {expect} = require('chai');

const options = {headless: false, slowMo: 20000};
const url = 'http://127.0.0.1:5050';

describe('test', function() {
    it('shouldWork', async function() {
        const browser = await chromium.launch(options);
        const page = await browser.newPage();

        await page.goto(url);
        
        await page.click('text=Login');
        await page.fill('input[name=email]', 'peter@abv.bg');
        await page.fill('input[name=password]', '123456');
        await page.click('input[value=Login]');

        // await browser.close();
        let buttonText = await page.textContent('logoutBtn');
        expect(buttonText).to.equal('Logout');
    }); 
});