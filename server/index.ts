import express from 'express';
import https from 'https';
import fs from 'fs';
import bodyParser from 'body-parser';
import { OAuth2Client } from 'google-auth-library';
import cookieParser from 'cookie-parser';
import {
  readFile,
  addReview,
  addBookmark,
  userExist,
  addUser,
  getCookie,
  getRestaurant,
  getUserPicture,
  deleteReviewBookmark,
} from './dbUtils';
import {addPictureToResponsefrom} from './utils';

const ipfilter = require('express-ipfilter').IpFilter;

const ips = ['127.0.0.1:3000', '::ffff:127.0.0.1'];

const client = new OAuth2Client(process.env.GOOGLE_ID);

require('dotenv').config();

const app = express();

app.use(cookieParser());
app.use(ipfilter(ips, { mode: 'allow' }));
app.use(bodyParser.json());

app.get('/api/google_id', (req, res) => {
  res.status(200).json(process.env.GOOGLE_ID);
});

app.get('/api/users/picture', async (req, res) => {
  const cookie = req.cookies.user_id;
  const userPicture = await getUserPicture(cookie);
  res.status(200).json(userPicture);
});

app.get('/api/clear_cookie', (req:express.Request, res:express.Response) => {
  res.clearCookie('user_id');
  res.status(200).json('Cookie cleared');
});

app.post('/api/google_id/verify', (req:express.Request, res:express.Response) => {
  async function verify() {
    const ticket = await client.verifyIdToken({
      idToken: req.body.token,
      audience: process.env.GOOGLE_ID,
    });
    const payload = ticket.getPayload();
    // @ts-ignore:
    const userid = payload.sub;

    const exists = await userExist(userid, 'sub');
    if (!exists) await addUser(payload);
    return getCookie(userid);
  }
  verify()
    .then((response) => res.status(200).cookie('user_id', response).json(response))
    .catch((err) => console.error('ERROR:', err));
});

app.get('/api/checkValidCookie', async (req: express.Request, res: express.Response) => {
  const exists = await userExist(req.cookies.user_id, 'cookie');
  res.status(200).json({ exists });
});

app.get('/api/nearby', async (req: express.Request, res: express.Response) => {
  let data = '';
  if (process.env.NODE_ENV === 'production') {
    return; 
  }
  data = await readFile('../mock_db/hornsgatan.json');
  data = await addPictureToResponsefrom(data, '../mock_db/hornsgatan.json');
  res.status(200).send(data);
});

app.get('/api/se/cities', async (req: express.Request, res: express.Response) => {
  const data: string = await readFile('./cities_SE.json');

  res.status(200).send(data);
});

app.get('/api/nearby/:city', async (req: express.Request, res: express.Response) => {
  

  let data = '';
  if (process.env.NODE_ENV === 'production') {
    const responseAPI = await fetch(`https://api.foursquare.com/v2/venues/search?near=stockholm&client_id=YOUR_ID&client_secret=YOUR_SECRET&v=20200621&categoryId=4d4b7105d754a06374d81259`)
    data = await responseAPI.json();
    data = await addPictureToResponsefrom(data, '../mock_db/stockholm.json');
  } else {
    data = await readFile('../mock_db/stockholm.json');
    data = await addPictureToResponsefrom(data, '../mock_db/stockholm.json');
  }
  res.status(200).send(data);
});

app.post('/api/users/reviews', async (req: express.Request, res: express.Response) => {
  const review = req.body;
  await addReview({ ...review, cookie: req.cookies.user_id });
  res.status(201).send('Successfully added review');
});

app.post('/api/users/bookmarks', async (req: express.Request, res: express.Response) => {
  const comment = req.body;
  await addBookmark({ ...comment, cookie: req.cookies.user_id });
  res.status(201).send('Successfully added bookmark');
});

app.get('/api/users/reviews', async (req: express.Request, res: express.Response) => {
  const cookie = req.cookies.user_id;
  const reviews = await getRestaurant(cookie, 'reviews');
  res.status(200).json(reviews);
});

app.get('/api/users/bookmarks', async (req: express.Request, res: express.Response) => {
  const cookie = req.cookies.user_id;
  const bookmarks = await getRestaurant(cookie, 'bookmarks');
  res.status(200).json(bookmarks);
});

app.delete('/api/users/reviews/:id', async (req: express.Request, res: express.Response) => {
  const reviewId = req.params.id;
  const cookie = req.cookies.user_id;
  await deleteReviewBookmark(reviewId, cookie, 'reviews');
  res.status(204).end();
});

app.delete('/api/users/bookmarks/:id', async (req: express.Request, res: express.Response) => {
  const bookmarkId = req.params.id;
  const cookie = req.cookies.user_id;
  await deleteReviewBookmark(bookmarkId, cookie, 'bookmarks');
  res.status(204).end();
});


https.createServer({
  key: fs.readFileSync('./certificates/server.key'),
  cert: fs.readFileSync('./certificates/server.crt'),
  passphrase: process.env.OPENSSL_PASS,
}, app).listen(8080, () => {
  console.log('listening on port 8080');
});

export default app;
