"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = tslib_1.__importDefault(require("express"));
const puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
const dbUtils_1 = tslib_1.__importDefault(require("./dbUtils"));
const encodeurl_1 = tslib_1.__importDefault(require("encodeurl"));
require('dotenv').config();
const app = express_1.default();
app.get('/api/nearby', async (req, res) => {
    let data = '';
    // const query = req.query.ll;
    if (process.env.NODE_ENV === 'production') {
        return; //  Make api call
    }
    data = await dbUtils_1.default('../mock_db/hornsgatan.json');
    res.status(200).send(data);
});
app.get('/api/se/cities', async (req, res) => {
    const data = await dbUtils_1.default('./cities_SE.json');
    res.status(200).send(data);
});
app.get('/api/nearby/:city', async (req, res) => {
    // const { city } = req.params;
    let data = '';
    let addedPicture = '';
    if (process.env.NODE_ENV === 'production') {
        // fetch(`https://api.foursquare.com/v2/venues/search?near=stockholm&client_id=YOUR_ID&client_secret=YOUR_SECRET&v=20200621&categoryId=4d4b7105d754a06374d81259`)
    }
    else {
        data = await dbUtils_1.default('../mock_db/stockholm.json');
        addedPicture = await getPictures(data);
    }
    res.status(200).json(addedPicture);
});
// https://api.foursquare.com/v2/venues/search?nar=stockholm&client_id=YOUR_ID&client_secret=YOUR_SECRET&v=20200621&categoryId=4d4b7105d754a06374d81259
app.listen(8080, () => {
    console.log('listening on port 8080');
});
async function getPictures(data) {
    const { response } = JSON.parse(data);
    //const venue = response.venues.splice(0,1);
    const addedPictures = await Promise.all(response.venues.map(async (restaurant) => {
        const name = restaurant.name;
        const city = restaurant.location.city;
        const imgageURL = await scraping(name, city);
        return { ...restaurant, imgageURL };
    }));
    return await { response: { venues: addedPictures } };
}
async function scraping(name, city) {
    let imageUrl;
    const browser = await puppeteer_1.default.launch({
        args: [
            '--disable-gl-drawing-for-tests',
            '--use-gl=desktop',
            '--no-sandbox',
        ]
    });
    const page = await browser.newPage();
    const encodedName = encodeurl_1.default(name);
    console.log('!!!', encodedName);
    const pageURL = `https://www.google.com/search?q=${encodedName}+${city}&source=lnms&tbm=isch`;
    try {
        await page.setRequestInterception(true);
        page.on('request', request => {
            if (request.resourceType() === 'stylesheet'
                || request.resourceType() === 'script')
                request.abort();
            else
                request.continue();
        });
        await page.goto(pageURL, { waitUntil: 'networkidle2' });
        //await page.waitForSelector('.sMi44c lNHeqe');
        const selector = '#islrg > div.islrc > div:nth-child(5) > a.wXeWr.islib.nfEiy.mM5pbd > div.bRMDJf.islir > img';
        imageUrl = await page.evaluate((sel) => {
            return document.querySelector(sel).getAttribute('src');
        }, selector);
        return imageUrl;
    }
    catch (err) {
        console.log(`failed to open the page: ${pageURL} with the error: ${err}`);
    }
    finally {
        await page.close();
        return imageUrl;
    }
}
exports.default = app;
