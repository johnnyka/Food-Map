import fs from 'fs';
import util from 'util';
import { uuid } from 'uuidv4';

const readFilePromise = util.promisify(fs.readFile);
export const writeFilePromise = util.promisify(fs.writeFile);

export async function readFile(path: string): Promise<string> { return readFilePromise(path, 'utf8'); }
export async function saveToFile(path: string, data: string): Promise<void> {
  return writeFilePromise(path, data);
}

interface IdatabaseData {
  cookie: string;
  id: string;
  date: string;
  restaurant: {
    id: string;
    name: string;
    location: {
      address: string;
      city: string;
      lat: number;
      lng: number;
      postalCode: string;
      country: string;
      neighborhood: string;
    }
    categories: {
      categoryId: string;
      categoryName: string;
    }
  }
}

export async function getRestaurant(cookie: string, path: string) {
  const db = await readFile(`./db/${path}.json`);
  const parsedDb = JSON.parse(db);
  return parsedDb[path].filter((el: IdatabaseData) => el.cookie === cookie);
}

export async function getCookie(googleId: string): Promise<string> {
  const db = await readFile('./db/users.json');
  const parsedDb = JSON.parse(db);
  const { cookie } = parsedDb.users.find((user: IUser) => user.sub === googleId);
  return cookie;
}

export async function addUser(userInfo: any): Promise<string> {
  const db = await readFile('./db/users.json');
  const parsedDb = JSON.parse(db);
  const {
    sub, email, given_name, family_name, picture,
  } = userInfo;
  parsedDb.users = [...parsedDb.users, {
    cookie: uuid(), sub, email, given_name, family_name, picture,
  }];
  await saveToFile('./db/users.json', JSON.stringify(parsedDb, null, 2));
  return 'Success';
}

interface IUser {
  given_name: string;
  family_name: string;
  picture: string;
  cookie: string;
  email: string;
  sub: string;
}
export async function userExist(identifier: string, searchType: 'cookie' | 'sub'): Promise<boolean> {
  const users = await readFile('./db/users.json');
  const parsedUsers = JSON.parse(users);
  return parsedUsers.users.find((user: IUser) => user[searchType] === identifier) !== undefined;
}

function validateReview(data: any): any {
  const {
    review, stars, id, name, location, categories, cookie, picture
  } = data;
  const {
    address, city, lat, lng, postalCode, country,
  } = location;
  const neighborhood = location.neighborhood ? location.neighborhood : null;
  const { id: categoryId, name: categoryName } = categories[0];
  if (Number.isNaN(stars) || stars > 5 || stars < 0) throw new Error('Star rating must be a number from 0-5');
  return {
    cookie,
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
    picture,
  };
}

function validateBookmark(data: any): any {
  const {
    comment, id, name, location, categories, cookie, picture
  } = data;
  const {
    address, city, lat, lng, postalCode, country,
  } = location;
  const neighborhood = location.neighborhood ? location.neighborhood : null;
  const { id: categoryId, name: categoryName } = categories[0];
  return {
    cookie,
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
    picture,
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

export async function getUserPicture(cookie: string): Promise<string> {
  const users = await readFile('./db/users.json');
  const { picture } = JSON.parse(users).users.find((user: IUser) => user.cookie === cookie);
  return picture;
}

export async function deleteReviewBookmark(
  id: string, cookie: string, type: string,
): Promise<void> {
  const file = `./db/${type}.json`;
  const db = await readFile(file);
  const parsedDb = JSON.parse(db);
  let updatedDb;
  if (type === 'reviews') {
    const updatedData = parsedDb.reviews.filter((review: IdatabaseData) => review.id !== id);
    updatedDb = { reviews: updatedData };
  } else if (type === 'bookmarks') {
    const updatedData = parsedDb.bookmarks.filter((bookmark: IdatabaseData) => bookmark.id !== id);
    updatedDb = { bookmarks: updatedData };
  }
  saveToFile(file, JSON.stringify(updatedDb, null, 2));
}
