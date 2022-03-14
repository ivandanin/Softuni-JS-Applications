let {chromium} = require('playwright-chromium');
let {expect} = require('chai');

let browser, page;

let host = 'http://localhost:5500';
let mockData = { 
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "J.K.Rowling",
        "title": "Harry Potter and the Philosopher's stone"
    },
    "d953e5fb-a585-4d6b-92d3-ee90697398a0": {
        "author": "Svetlin Nakov",
        "title": "C# Fundamentals"
    }
};

describe('tests', async function() {
    this.timeout(6000);


    before(async () => {
        browser = await chromium.launch();
    });

    after(async () => {
        await browser.close();
    });

    beforeEach(async () => {
        page = await browser.newPage();
    });

    afterEach(async () => {
        page.close();
    });



    //setup test
    // it('works', async () => {
    //     await new Promise(r => setTimeout(r, 2000));
    //     expect(1).to.equal(1);
    // });

    it('loads all books', async () => {
        await page.route('../jsonstore/collections/books', (route, request) => {
            route.fulfill({
                body: JSON.stringify(mockData),
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json'
                }
            });
        });

        await page.goto(host);
        await page.click('text=Load all books');
        await page.waitForSelector('text=Harry Potter');
        let rowData = await page.$$eval('tbody tr', rows => rows.map(r => r.textContent));

        expect(rowData[0]).to.contains('Harry Potter');
        expect(rowData[0]).to.contains('Rowling');
        expect(rowData[1]).to.contains('C# Fundamentals');
        expect(rowData[1]).to.contains('Nakov');

    });
});