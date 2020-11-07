import request from 'supertest';
import app from './index';
import { readFile } from './dbUtils';

describe('Express server routes', () => {
  test('Gives the correct status and mock data from our db', async () => {
    const mockData = await readFile('../mock_db/foursquare/hornsgatan.json');
    return request(app)
      .get('/api/nearby?ll=59.32,18.07')
      .expect(200, mockData);
  });
  test('Get all the major 295 cities in Sweden', async () => {
    const mockData = await readFile('./cities_SE.json');
    return request(app)
      .get('/api/se/cities')
      .expect(200, mockData);
  });
});

