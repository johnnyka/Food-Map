"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addBookmark = exports.addReview = exports.readFile = void 0;
var fs_1 = __importDefault(require("fs"));
var util_1 = __importDefault(require("util"));
var uuidv4_1 = require("uuidv4");
var readFilePromise = util_1.default.promisify(fs_1.default.readFile);
function readFile(path) {
    return __awaiter(this, void 0, void 0, function () { return __generator(this, function (_a) {
        return [2 /*return*/, readFilePromise(path, 'utf8')];
    }); });
}
exports.readFile = readFile;
var writeFilePromise = util_1.default.promisify(fs_1.default.writeFile);
function saveToFile(path, data) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, writeFilePromise(path, data)];
        });
    });
}
// interface IData {
//   review: string;
//   stars: number;
//   restaurant: Object;
// }
function validateReview(data) {
    var review = data.review, stars = data.stars, id = data.id, name = data.name, location = data.location, categories = data.categories;
    var address = location.address, city = location.city, lat = location.lat, lng = location.lng, postalCode = location.postalCode, country = location.country;
    var neighborhood = location.neighborhood ? location.neighborhood : null;
    var _a = categories[0], categoryId = _a.id, categoryName = _a.name;
    if (Number.isNaN(stars) || stars > 5 || stars < 0)
        throw new Error('Star rating must be a number from 0-5');
    return {
        id: uuidv4_1.uuid(),
        date: new Date(),
        restaurant: {
            id: id,
            name: name,
            location: {
                address: address, city: city, lat: lat, lng: lng, postalCode: postalCode, country: country, neighborhood: neighborhood,
            },
            categories: {
                categoryId: categoryId,
                categoryName: categoryName,
            },
        },
        review: {
            review: review,
            stars: stars,
        },
    };
}
function validateBookmark(data) {
    var comment = data.comment, id = data.id, name = data.name, location = data.location, categories = data.categories;
    var address = location.address, city = location.city, lat = location.lat, lng = location.lng, postalCode = location.postalCode, country = location.country;
    var neighborhood = location.neighborhood ? location.neighborhood : null;
    var _a = categories[0], categoryId = _a.id, categoryName = _a.name;
    return {
        id: uuidv4_1.uuid(),
        date: new Date(),
        restaurant: {
            id: id,
            name: name,
            location: {
                address: address, city: city, lat: lat, lng: lng, postalCode: postalCode, country: country, neighborhood: neighborhood,
            },
            categories: {
                categoryId: categoryId,
                categoryName: categoryName,
            },
        },
        comment: comment,
    };
}
function addReview(data) {
    return __awaiter(this, void 0, void 0, function () {
        var reviews, validatedReview, updatedReviews;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile('./db/reviews.json')];
                case 1:
                    reviews = _a.sent();
                    validatedReview = validateReview(data);
                    updatedReviews = JSON.parse(reviews);
                    updatedReviews.reviews.push(validatedReview);
                    return [4 /*yield*/, saveToFile('./db/reviews.json', JSON.stringify(updatedReviews, null, 2))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, 'Success'];
            }
        });
    });
}
exports.addReview = addReview;
function addBookmark(data) {
    return __awaiter(this, void 0, void 0, function () {
        var bookmarks, validatedBookmark, updatedBookmarks;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readFile('./db/bookmarks.json')];
                case 1:
                    bookmarks = _a.sent();
                    validatedBookmark = validateBookmark(data);
                    updatedBookmarks = JSON.parse(bookmarks);
                    updatedBookmarks.bookmarks.push(validatedBookmark);
                    return [4 /*yield*/, saveToFile('./db/bookmarks.json', JSON.stringify(updatedBookmarks, null, 2))];
                case 2:
                    _a.sent();
                    return [2 /*return*/, 'Success'];
            }
        });
    });
}
exports.addBookmark = addBookmark;
