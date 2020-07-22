import fs from 'fs';
import util from 'util';

const readFilePromise = util.promisify(fs.readFile);

const readFile = async (path: string): Promise<string> => readFilePromise(path, 'utf8');

export default readFile;
