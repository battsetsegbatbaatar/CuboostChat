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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_js_1 = __importDefault(require("crypto-js"));
const chat_1 = __importStar(require("@sendbird/chat"));
const message_1 = require("@sendbird/chat/message");
dotenv_1.default.config();
const ENCRYPTION_KEY = 'encryption-key';
const { APP_ID, DB_HOST } = process.env;
if (!APP_ID) {
    throw new Error('APP_ID environment variable is not defined.');
}
if (!DB_HOST) {
    throw new Error('DB_HOST environment variable is not defined.');
}
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
    customApiHost: DB_HOST
};
const sb = chat_1.default.init(params);
console.log('SendbirdChat initialized:', sb);
