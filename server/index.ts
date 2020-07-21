require('dotenv').config();
import express from "express";
import readFile from './dbUtils'
const app = express();

app.get('/api/nearby', async (req: express.Request, res: express.Response) => {
  let data = '';
  const query = req.query.ll;
  if (process.env.NODE_ENV === 'production') {
    return //  Make api call
  } else {
    data = await readFile('../mock_db/foursquare/hornsgatan.json');
  }
  res.status(200).send(data)
});

app.get('/api/se/cities', async (req: express.Request, res: express.Response) => {
    let data:string = await readFile('./cities_SE.json')

    res.status(200).send(data);
});
app.listen(8080, () => {
  console.log('listening on port 8080')
})


export default app;