import fs from 'fs';
import util from 'util';
import { uuid } from 'uuidv4';

const readFilePromise = util.promisify(fs.readFile);
export async function readFile(path: string): Promise<string> { return readFilePromise(path, 'utf8'); }

const writeFilePromise = util.promisify(fs.writeFile);

async function saveToFile(path: string, data: string): Promise<void> {
  return writeFilePromise(path, data);
}

// interface IData {
//   review: string;
//   stars: number;
//   restaurant: Object;
// }

function validateReview(data: any): any {
  const {
    review, stars, id, name, location, categories,
  } = data;
  const {
    address, city, lat, lng, postalCode, country,
  } = location;
  const neighborhood = location.neighborhood ? location.neighborhood : null;
  const { id: categoryId, name: categoryName } = categories[0];
  if (Number.isNaN(stars) || stars > 5 || stars < 0) throw new Error('Star rating must be a number from 0-5');
  return {
    id: uuid(),
    date: new Date(),
    restaurant: {
      id,
      name,
      location: {
        address, city, lat, lng, postalCode, country, neighborhood,
      },
      categories: {
        categoryId,
        categoryName,
      },
    },
    review: {
      review,
      stars,
    },
  };
}

function validateBookmark(data: any): any {
  const {
    comment, id, name, location, categories,
  } = data;
  const {
    address, city, lat, lng, postalCode, country,
  } = location;
  const neighborhood = location.neighborhood ? location.neighborhood : null;
  const { id: categoryId, name: categoryName } = categories[0];
  return {
    id: uuid(),
    date: new Date(),
    restaurant: {
      id,
      name,
      location: {
        address, city, lat, lng, postalCode, country, neighborhood,
      },
      categories: {
        categoryId,
        categoryName,
      },
    },
    comment,
  };
}

export async function addReview(data: string): Promise<string> {
  const reviews = await readFile('./db/reviews.json');
  const validatedReview = validateReview(data);
  const updatedReviews = JSON.parse(reviews);
  updatedReviews.reviews.push(validatedReview);
  await saveToFile('./db/reviews.json', JSON.stringify(updatedReviews, null, 2));
  return 'Success';
}

export async function addBookmark(data: string): Promise<string> {
  const bookmarks = await readFile('./db/bookmarks.json');
  const validatedBookmark = validateBookmark(data);
  const updatedBookmarks = JSON.parse(bookmarks);
  updatedBookmarks.bookmarks.push(validatedBookmark);
  await saveToFile('./db/bookmarks.json', JSON.stringify(updatedBookmarks, null, 2));
  return 'Success';
}
