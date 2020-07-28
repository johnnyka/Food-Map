"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.scraping = void 0;
const tslib_1 = require("tslib");
const puppeteer_1 = tslib_1.__importDefault(require("puppeteer"));
const encodeurl_1 = tslib_1.__importDefault(require("encodeurl"));
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
    const pageURL = `https://www.google.com/search?q=${encodedName}+${city}&source=lnms&tbm=isch`;
    try {
        await page.setRequestInterception(true);
        const ignoreResourceTypes = ['stylesheet', 'media', 'font', 'script', 'texttrack', 'xhr', 'fetch', 'eventsource', 'websocket', 'manifest'];
        page.on('request', request => {
            if (ignoreResourceTypes.some(type => type === request.resourceType()))
                request.abort();
            else
                request.continue();
        });
        await page.goto(pageURL, { waitUntil: 'networkidle2' });
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
exports.scraping = scraping;
