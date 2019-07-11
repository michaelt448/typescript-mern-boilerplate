/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("mongoose");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __webpack_require__(0);
const itemSchemaDef = {
    name: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        required: true
    }
};
const itemSchema = new mongoose_1.Schema(itemSchemaDef);
exports.default = mongoose_1.model("Item", itemSchema);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = __webpack_require__(9);
const jsonwebtoken_1 = __webpack_require__(10);
const mongoose_1 = __webpack_require__(0);
const userSchemaDef = {
    email: {
        type: String,
        unique: true,
        required: true
    },
    hash: {
        type: String,
        required: true
    },
    salt: {
        type: String,
        required: true
    }
};
const userSchema = new mongoose_1.Schema(userSchemaDef);
class UserClass {
    setPassword(password) {
        this.salt = crypto_1.randomBytes(16).toString("hex");
        this.hash = crypto_1.pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
    }
    isPasswordValid(password) {
        const hash = crypto_1.pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
        return this.hash === hash;
    }
    generateJwt() {
        const expiry = new Date();
        expiry.setMinutes(expiry.getMinutes() + 30);
        const token = jsonwebtoken_1.sign({
            _id: this.id,
            email: this.email,
            exp: Math.round(expiry.getTime() / 1000),
        }, process.env.AUTH_SHARED_SECRET);
        return { token, expiry };
    }
}
userSchema.loadClass(UserClass);
exports.default = mongoose_1.model("User", userSchema);


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("body-parser");

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __webpack_require__(15);
exports.authorize = jwt({
    secret: process.env.AUTH_SHARED_SECRET
});


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = __webpack_require__(0);
const populateDatabase_1 = __webpack_require__(7);
const app_1 = __webpack_require__(11);
const url = process.env.MONGODB_URI || "mongodb://localhost:27017/test_database";
const port = process.env.PORT || 9000;
(() => __awaiter(this, void 0, void 0, function* () {
    yield mongoose.connect(url, { useNewUrlParser: true });
    yield populateDatabase_1.default();
    app_1.default.listen(port);
    console.log(`App listening on port ${port}...`);
}))();


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __webpack_require__(8);
const item_model_1 = __webpack_require__(2);
const user_model_1 = __webpack_require__(3);
const populateDatabase = () => __awaiter(this, void 0, void 0, function* () {
    try {
        const users = yield user_model_1.default.find({});
        const items = yield item_model_1.default.find({});
        if (users.length === 0 && items.length === 0) {
            console.log(chalk_1.default.yellow("No users or items in the database, creating sample data..."));
            const user = new user_model_1.default();
            user.email = "testuser@email.com";
            user.setPassword("my-password");
            yield user.save();
            console.log(chalk_1.default.green("Sample user successfuly created!"));
            const newItems = [
                { name: "Paper clip", value: 0.1 },
                { name: "Colorful pen", value: 1.2 },
                { name: "Notebook", value: 2.5 },
                { name: "Soft eraser", value: 0.5 },
                { name: "Table lamp", value: 5.1 }
            ];
            yield item_model_1.default.insertMany(newItems);
            console.log(chalk_1.default.green(`${newItems.length} item(s) successfuly created!`));
        }
        else {
            console.log(chalk_1.default.yellow("Database already initiated, skipping populating script"));
        }
    }
    catch (error) {
        console.log(chalk_1.default.red(error));
    }
});
exports.default = populateDatabase;


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = require("chalk");

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __webpack_require__(12);
const express = __webpack_require__(1);
const path = __webpack_require__(13);
dotenv.config();
const items_controller_1 = __webpack_require__(14);
const users_controller_1 = __webpack_require__(16);
const app = express();
app.use("/api/items", items_controller_1.default);
app.use("/api/users", users_controller_1.default);
app.use(express.static(path.resolve("..", "frontend", "build")));
app.get("*", (_, response) => {
    response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});
exports.default = app;


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = require("dotenv");

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __webpack_require__(4);
const express = __webpack_require__(1);
const config_1 = __webpack_require__(5);
const item_model_1 = __webpack_require__(2);
const router = express.Router();
router.route("/").get(config_1.authorize, (_, response) => __awaiter(this, void 0, void 0, function* () {
    const items = yield item_model_1.default.find();
    return response.status(200).json(items);
}));
router.route("/").post(config_1.authorize, bodyParser.json(), (request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        const item = new item_model_1.default(request.body);
        yield item.save();
        return response.status(200).json("Item saved!");
    }
    catch (error) {
        return response.status(400).send(error);
    }
}));
exports.default = router;


/***/ }),
/* 15 */
/***/ (function(module, exports) {

module.exports = require("express-jwt");

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = __webpack_require__(4);
const express_1 = __webpack_require__(1);
const passport = __webpack_require__(17);
const passport_local_1 = __webpack_require__(18);
const config_1 = __webpack_require__(5);
const user_model_1 = __webpack_require__(3);
passport.use(new passport_local_1.Strategy({ usernameField: "email" }, (username, password, done) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.default.findOne({ email: username });
        if (user && user.isPasswordValid(password)) {
            return done(null, user);
        }
        else {
            throw new Error("Invalid credentials");
        }
    }
    catch (error) {
        return done(error);
    }
})));
const router = express_1.Router();
router.route("/register").post(bodyParser.json(), (request, response) => __awaiter(this, void 0, void 0, function* () {
    try {
        const user = new user_model_1.default();
        user.email = request.body.email;
        user.setPassword(request.body.password);
        yield user.save();
        const tokenSignature = user.generateJwt();
        return response.status(200).json(tokenSignature);
    }
    catch (error) {
        return response.status(400).send(error);
    }
}));
router.route("/login").post(bodyParser.json(), (request, response) => {
    passport.authenticate("local", (error, user) => {
        if (!user) {
            return response.status(400).json({ error: error.message });
        }
        const tokenSignature = user.generateJwt();
        return response.status(200).json(tokenSignature);
    })(request, response);
});
router.route("/profile").get(config_1.authorize, (request, response) => __awaiter(this, void 0, void 0, function* () {
    const user = yield user_model_1.default.findById(request.user._id);
    return response.status(200).json(user);
}));
exports.default = router;


/***/ }),
/* 17 */
/***/ (function(module, exports) {

module.exports = require("passport");

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = require("passport-local");

/***/ })
/******/ ]);