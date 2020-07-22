"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const supertest_1 = tslib_1.__importDefault(require("supertest"));
const index_1 = tslib_1.__importDefault(require("./index"));
const dbUtils_1 = tslib_1.__importDefault(require("./dbUtils"));
describe('Express server routes', () => {
    test('Gives the correct status and mock data from our db', async () => {
        const mockData = await dbUtils_1.default('../mock_db/foursquare/hornsgatan.json');
        return supertest_1.default(index_1.default)
            .get('/api/nearby?ll=59.32,18.07')
            .expect(200, mockData);
    });
    test('Get all the major 295 cities in Sweden', async () => {
        const mockData = await dbUtils_1.default('./cities_SE.json');
        return supertest_1.default(index_1.default)
            .get('/api/se/cities')
            .expect(200, mockData);
    });
});
// https://api.foursquare.com/v2/venues/search?ll=59.32,18.07&client_id=MBRCJZD0R44AWD4Z2TLLXAEGZAIV0WEPNGEACRO5Y5UVHX1B&client_secret=LPRHXCDJLK1ICA4GVUCY0JBA1H0BAF41RUVZIGRFCH420XMW&v=20200621&categoryId=4d4b7105d754a06374d81259
