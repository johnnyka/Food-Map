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
  console.log('!!',venuesObj.venuesCategories);
  const updatedCategories = {...venuesObj.venuesCategories};
 // updatedCategories.venuesCategories[updatedPath].small ='testing' ; 
/*   if(`${updatedPath}` in venuesObj){
   // return venuesObj[updatedPath];
  }else {
    const response = await unsplash.search.photos(path, 1, 1, { orientation: 'landscape' });
    //const json = await response.json();
  
    // const url = `https://api.unsplash.com/photos/?client_id=${process.env.UNSPLASH_ACCESS_KEY}`
    // const response = await fetch(path);
    // const json = await response.json();

    //return venuesObj.venuesCategories[updatedPath];
  } */

saveToFile('../mock_db/venuesCategories.json', JSON.stringify(updatedCategories));
};

export const addPictureToResponsefrom = async (json: string) => {
  let jsonObj = [];
  if (process.env.NODE_ENV === 'production') {
    jsonObj = JSON.parse(json);
  } else {
    const db = await readFile('../mock_db/stockholm.json');
    jsonObj = JSON.parse(db);
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
 // saveToFile('../mock_db/stockholm.json', JSON.stringify(obj));

  // console.log('Picture', picture.results[0].urls);
  // console.log('Links', picture.results[0].links);
};
