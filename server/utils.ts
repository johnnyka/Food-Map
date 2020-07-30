// import fs from 'fs';
// import util from 'util';
import fetch from 'node-fetch';

import Unsplash from 'unsplash-js';
import { json } from 'express';
import { readFile, saveToFile } from './dbUtils';

require('dotenv').config();





// @ts-ignore:
global.fetch = fetch;
// @ts-ignore:
const unsplash = new Unsplash({ accessKey: process.env.UNSPLASH_ACCESS_KEY });

const getPictures = async (path: string) => {
  const venuesJson = await readFile('../mock_db/venuesCategories.json');
  const venuesObj = JSON.parse(venuesJson);
  const updatedPath = path.replace(/\s/g, '-');
  const updatedCategories = { ...venuesObj };
  if (`${updatedPath}` in venuesObj.venuesCategories) {
    return venuesObj.venuesCategories[updatedPath];
  } else {
    const response = await unsplash.search.photos(path, 1, 1, { orientation: 'landscape' });
    const json = await response.json();
    let small = json.results[0].urls.small;
    updatedCategories.venuesCategories[updatedPath] = small;
    saveToFile('../mock_db/venuesCategories.json', JSON.stringify(updatedCategories, null, 2));
    return venuesObj.venuesCategories[updatedPath];
  }

};


export const addPictureToResponsefrom = async (json: string, file: string) => {
  let jsonObj = [];
  if (process.env.NODE_ENV === 'production') {
    jsonObj = JSON.parse(json);
  } else {
    jsonObj = JSON.parse(json);
  }
  const updatedData = await Promise.all(jsonObj.response.venues.map(async (restaurant: any) => {
    const picture = await getPictures(restaurant.categories[0].name);
    return { ...restaurant, picture };
  }));
   const obj = {
      meta: {
        code: 200,
        requestId: '5f18063a5f54b45329b3543d',
      },
      response: {
        venues: [...updatedData],
      },
    };
  saveToFile(file, JSON.stringify(obj, null, 2));

 return JSON.stringify(obj)
};
