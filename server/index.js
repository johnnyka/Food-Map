"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var express_1 = __importDefault(require("express"));
var https_1 = __importDefault(require("https"));
var fs_1 = __importDefault(require("fs"));
var body_parser_1 = __importDefault(require("body-parser"));
var dbUtils_1 = require("./dbUtils");
var google_auth_library_1 = require("google-auth-library");
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var ipfilter = require('express-ipfilter').IpFilter;
var ips = ['127.0.0.1:3000', '::ffff:127.0.0.1'];
var client = new google_auth_library_1.OAuth2Client(process.env.GOOGLE_ID);
require('dotenv').config();
var app = express_1.default();
app.use(cookie_parser_1.default());
app.use(ipfilter(ips, { mode: 'allow' }));
app.use(body_parser_1.default.json());
app.get('/api/google_id', function (req, res) {
    res.status(200).json(process.env.GOOGLE_ID);
});
app.get('/api/clear_cookie', function (req, res) {
    res.clearCookie('user_id');
    res.status(200).json('Cookie cleared');
});
app.post('/api/google_id/verify', function (req, res) {
    function verify() {
        return __awaiter(this, void 0, void 0, function () {
            var ticket, payload, userid, exists, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, client.verifyIdToken({
                            idToken: req.body.token,
                            audience: process.env.GOOGLE_ID,
                        })];
                    case 1:
                        ticket = _a.sent();
                        payload = ticket.getPayload();
                        userid = payload['sub'];
                        return [4 /*yield*/, dbUtils_1.userExist(userid, 'sub')];
                    case 2:
                        exists = _a.sent();
                        if (!!exists) return [3 /*break*/, 4];
                        return [4 /*yield*/, dbUtils_1.addUser(payload)];
                    case 3:
                        result = _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, dbUtils_1.getCookie(userid)];
                }
            });
        });
    }
    verify()
        .then(function (response) { return res.status(200).cookie('user_id', response).json(response); })
        .catch(function (err) { return console.error('ERROR:', err); });
});
app.get('/api/checkValidCookie', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var exists;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbUtils_1.userExist(req.cookies.user_id, 'cookie')];
            case 1:
                exists = _a.sent();
                res.status(200).json({ exists: exists });
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/nearby', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = '';
                // const query = req.query.ll;
                if (process.env.NODE_ENV === 'production') {
                    return [2 /*return*/]; //  Make api call
                }
                return [4 /*yield*/, dbUtils_1.readFile('../mock_db/hornsgatan.json')];
            case 1:
                data = _a.sent();
                res.status(200).send(data);
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/se/cities', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, dbUtils_1.readFile('./cities_SE.json')];
            case 1:
                data = _a.sent();
                res.status(200).send(data);
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/nearby/:city', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                data = '';
                if (!(process.env.NODE_ENV === 'production')) return [3 /*break*/, 1];
                return [3 /*break*/, 3];
            case 1: return [4 /*yield*/, dbUtils_1.readFile('../mock_db/stockholm.json')];
            case 2:
                data = _a.sent();
                _a.label = 3;
            case 3:
                res.status(200).send(data);
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/users/reviews', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var review;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                review = req.body;
                return [4 /*yield*/, dbUtils_1.addReview(__assign(__assign({}, review), { cookie: req.cookies.user_id }))];
            case 1:
                _a.sent();
                res.status(201).send('Successfully added review');
                return [2 /*return*/];
        }
    });
}); });
app.post('/api/users/bookmarks', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var comment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                comment = req.body;
                return [4 /*yield*/, dbUtils_1.addBookmark(__assign(__assign({}, comment), { cookie: req.cookies.user_id }))];
            case 1:
                _a.sent();
                res.status(201).send('Successfully added bookmark');
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/users/reviews', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, reviews;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookie = req.cookies.user_id;
                return [4 /*yield*/, dbUtils_1.getRestaurant(cookie, 'reviews')];
            case 1:
                reviews = _a.sent();
                res.status(200).json(reviews);
                return [2 /*return*/];
        }
    });
}); });
app.get('/api/users/bookmarks', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var cookie, bookmarks;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                cookie = req.cookies.user_id;
                return [4 /*yield*/, dbUtils_1.getRestaurant(cookie, 'bookmarks')];
            case 1:
                bookmarks = _a.sent();
                res.status(200).json(bookmarks);
                return [2 /*return*/];
        }
    });
}); });
// https://api.foursquare.com/v2/venues/search?nar=stockholm&client_id=YOUR_ID&client_secret=YOUR_SECRET&v=20200621&categoryId=4d4b7105d754a06374d81259
https_1.default.createServer({
    key: fs_1.default.readFileSync('./certificates/server.key'),
    cert: fs_1.default.readFileSync('./certificates/server.crt'),
    passphrase: process.env.OPENSSL_PASS,
}, app).listen(8080, function () {
    console.log('listening on port 8080'); // eslint-disable-line
});
exports.default = app;
