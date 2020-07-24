import express from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import { readFile, addReview, addBookmark } from './dbUtils';

require('dotenv').config();

const app = express();

app.use(bodyParser.json());

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
  const data:string = await readFile('./cities_SE.json');

  res.status(200).send(data);
});
app.get('/api/nearby/:city', async (req: express.Request, res: express.Response) => {
  // const { city } = req.params;
  let data = '';
  if (process.env.NODE_ENV === 'production') {
    // fetch(`https://api.foursquare.com/v2/venues/search?near=stockholm&client_id=YOUR_ID&client_secret=YOUR_SECRET&v=20200621&categoryId=4d4b7105d754a06374d81259`)
  } else {
    data = await readFile('../mock_db/stockholm.json');
  }
  res.status(200).send(data);
});

app.post('/api/users/reviews', async (req: express.Request, res: express.Response) => {
  const review = req.body;
  await addReview(review);
  res.status(201).send('Successfully added review');
});

app.post('/api/users/bookmarks', async (req: express.Request, res: express.Response) => {
  const comment = req.body;
  await addBookmark(comment);
  res.status(201).send('Successfully added bookmark');
});

// https://api.foursquare.com/v2/venues/search?nar=stockholm&client_id=YOUR_ID&client_secret=YOUR_SECRET&v=20200621&categoryId=4d4b7105d754a06374d81259

https.createServer({
  key: fs.readFileSync('./certificates/server.key'),
  cert: fs.readFileSync('./certificates/server.crt'),
  passphrase: process.env.OPENSSL_PASS,
}, app).listen(8080, () => {
  console.log('listening on port 8080'); // eslint-disable-line
});

export default app;
