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
  const updatedPath = path.replace(/\s/g, '-');
  const response = await unsplash.search.photos(path, 1, 1, { orientation: 'landscape' });
  const json = await response.json();

  // const url = `https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
  // const response = await fetch(path);
  // const json = await response.json();
  return json.results[0].urls.small;
};

export const updateDb = async (json: string) => {
  const db = await readFile('../mock_db/stockholm.json');
  const dbArr = JSON.parse(db);
  const updatedData = await Promise.all(dbArr.response.venues.map(async (restaurant: any) => {
    const picture = await getPictures(restaurant.categories[0].name);
    console.log('PIC', picture);
    return { ...restaurant, picture };
  }));
  console.log(updatedData);
  const obj = {
    meta: {
      code: 200,
      requestId: '5f18063a5f54b45329b3543d',
    },
    response: {
      venues: [...updatedData],
    },
  };
  saveToFile('../mock_db/stockholm.json', JSON.stringify(obj));

  // console.log('Picture', picture.results[0].urls);
  // console.log('Links', picture.results[0].links);
};
