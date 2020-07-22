import express from 'express';
import readFile from './dbUtils';
import puppeteer from 'puppeteer';

require('dotenv').config();

const app = express();


app.get('/api/nearby', async (req: express.Request, res: express.Response) => {
  let data = '';
  // const query = req.query.ll;
  if (process.env.NODE_ENV === 'production') {
    return; //  Make api call
  }
  data = await readFile('../mock_db/hornsgatan.json');

  res.status(200).send(data);
});

app.get('/api/se/cities', async (req: express.Request, res: express.Response) => {
  const data: string = await readFile('./cities_SE.json');

  res.status(200).send(data);
});
app.get('/api/nearby/:city', async (req: express.Request, res: express.Response) => {
  // const { city } = req.params;
  let data = '';
  let addedPicture:any = '';
  if (process.env.NODE_ENV === 'production') {
    // fetch(`https://api.foursquare.com/v2/venues/search?near=stockholm&client_id=YOUR_ID&client_secret=YOUR_SECRET&v=20200621&categoryId=4d4b7105d754a06374d81259`)
  } else {
    data = await readFile('../mock_db/stockholm.json');
    addedPicture = await getPictures(data);
  }
  res.status(200).send(addedPicture);
});

// https://api.foursquare.com/v2/venues/search?nar=stockholm&client_id=YOUR_ID&client_secret=YOUR_SECRET&v=20200621&categoryId=4d4b7105d754a06374d81259

app.listen(8080, () => {
  console.log('listening on port 8080');
});

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

async function scraping(name: string, city: string): Promise<string> {
  let imageUrl: any;
  const browser = await puppeteer.launch({
    args: [
      '--disable-gl-drawing-for-tests',
      '--use-gl=desktop',
      '--no-sandbox',
      '--disable-gpu'
    ]
  });
  const page = await browser.newPage();
  const pageURL = `https://www.google.com/search?q=${name}+${city}&source=lnms&tbm=isch`
  try {
    await page.goto(pageURL, { waitUntil: 'networkidle2' });
    //await page.waitForSelector('.sMi44c lNHeqe');
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
export default app;
