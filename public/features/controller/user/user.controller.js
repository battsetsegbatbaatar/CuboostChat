"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const user_model_1 = require("../../shared/models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const sendbird_1 = require("sendbird");
const chat_1 = __importStar(require("@sendbird/chat"));
const message_1 = require("@sendbird/chat/message");
dotenv_1.default.config();
const ENCRYPTION_KEY = 'encryption-key';
const { APP_ID, DB_HOST, JWT_TOKEN_SALT, JWT_EXPIRATION } = process.env;
class UserController {
    static _generateJwt(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const jwtPayload = { id };
            if (!JWT_TOKEN_SALT) {
                throw new Error('JWT_TOKEN_SALT is not defined');
            }
            const jwtToken = jsonwebtoken_1.default.sign(jwtPayload, JWT_TOKEN_SALT, {
                expiresIn: JWT_EXPIRATION
            });
            return jwtToken;
        });
    }
    static _verifyJwt(token) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!JWT_TOKEN_SALT) {
                throw new Error('JWT_TOKEN_SALT is not defined');
            }
            try {
                const jwtObject = jsonwebtoken_1.default.verify(token, JWT_TOKEN_SALT);
                return jwtObject;
            }
            catch (error) {
                throw new Error('Invalid token');
            }
        });
    }
    static getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findAll();
        });
    }
    static getUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findOne({ where: { id: userId } });
        });
    }
    static signIn(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!password)
                throw new Error('Password is required');
            const user = yield user_model_1.UserModel.findOne({ where: { email } });
            if (!user)
                throw new Error('User not found');
            const isMatch = yield bcrypt_1.default.compare(password, user.password);
            if (!isMatch)
                throw new Error('Invalid password');
            const token = yield this._generateJwt(user.id);
            return { user, token };
        });
    }
    static createUser(userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email, password } = userInput;
            if (!password || typeof password !== 'string') {
                throw new Error('Invalid password');
            }
            const hashedPassword = yield bcrypt_1.default.hash(password, 10);
            try {
                const existingUser = yield user_model_1.UserModel.findOne({ where: { email } });
                if (existingUser) {
                    throw new Error('Email already exists');
                }
                const user = yield user_model_1.UserModel.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                    role: 'CREATOR'
                });
                const token = yield this._generateJwt(user.id);
                const params = {
                    appId: APP_ID,
                    localCacheEnabled: true,
                    localCacheEncryption: {
                        encrypt: (rawData) => {
                            const encryptedData = crypto_js_1.default.AES.encrypt(JSON.stringify(rawData), ENCRYPTION_KEY).toString();
                            return { key: encryptedData };
                        },
                        decrypt: (encryptedData) => {
                            const decryptedData = crypto_js_1.default.AES.decrypt(encryptedData.key, ENCRYPTION_KEY).toString(crypto_js_1.default.enc.Utf8);
                            return JSON.parse(decryptedData);
                        }
                    },
                    localCacheConfig: new chat_1.LocalCacheConfig({
                        maxSize: 256,
                        clearOrder: chat_1.CachedDataClearOrder.MESSAGE_COLLECTION_ACCESSED_AT
                    }),
                    modules: [new message_1.BaseMessage()],
                    logLevel: sendbird_1.LogLevel.WARN,
                    customApiHost: DB_HOST
                };
                const sb = chat_1.default.init(params);
                console.log('SendbirdChat initialized:', sb);
                const sendbirdUser = yield sb.connect(user.id);
                console.log('Sendbird user connected:', sendbirdUser);
                return { user, token };
            }
            catch (error) {
                if (error instanceof Error &&
                    error.message.includes('Email already exists')) {
                    throw new Error('Email already exists');
                }
                throw error;
            }
        });
    }
    static updateUser(userId, userInput) {
        return __awaiter(this, void 0, void 0, function* () {
            const { firstName, lastName, email } = userInput;
            return yield user_model_1.UserModel.update({
                firstName,
                lastName,
                email
            }, { where: { id: userId } });
        });
    }
    static deleteUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield user_model_1.UserModel.destroy({ where: { id: userId } });
            }
            catch (error) {
                throw new Error('Error deleting user');
            }
        });
    }
}
exports.default = UserController;
