import puppeteer from 'puppeteer';
import encodeUrl from 'encodeurl';

async function getPictures(data: any): Promise<Object> {
  const { response } = JSON.parse(data);
    //const venue = response.venues.splice(0,1);
    const addedPictures =  await Promise.all(response.venues.map(async (restaurant:any) => {
      const name:string = restaurant.name;
      const city:string = restaurant.location.city;
      const imgageURL = await scraping(name, city)
      return {...restaurant, imgageURL};
    }));
  return await {response:{venues: addedPictures}};
}

export async function scraping(name: string, city: string): Promise<string> {
  let imageUrl: any;
  const browser = await puppeteer.launch({
    args: [
      '--disable-gl-drawing-for-tests',
      '--use-gl=desktop',
      '--no-sandbox',
    ]
  });
  const page = await browser.newPage();
  const encodedName = encodeUrl(name);
  const pageURL = `https://www.google.com/search?q=${encodedName}+${city}&source=lnms&tbm=isch`
  try {
    await page.setRequestInterception(true);
    const ignoreResourceTypes = ['stylesheet', 'media', 'font', 'script', 'texttrack', 'xhr', 'fetch', 'eventsource', 'websocket', 'manifest']
    page.on('request', request => {
      if (ignoreResourceTypes.some(type => type === request.resourceType()))
        request.abort();
      else
        request.continue();
    });
    await page.goto(pageURL, { waitUntil: 'networkidle2' });
    const selector = '#islrg > div.islrc > div:nth-child(5) > a.wXeWr.islib.nfEiy.mM5pbd > div.bRMDJf.islir > img'
    imageUrl = await page.evaluate((sel) => {
      return document.querySelector(sel).getAttribute('src');
    },selector);
    return imageUrl;
  
  } catch (err) {
    console.log(`failed to open the page: ${pageURL} with the error: ${err}`);
  } finally {
    await page.close();
    return imageUrl;
  }
}