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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatResolver = void 0;
const sendBird_controller_1 = __importDefault(require("../../controller/chat/sendBird.controller"));
exports.chatResolver = {
    Query: {
        getListUser: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield sendBird_controller_1.default.getListUser();
                return {
                    success: true,
                    message: 'Амжилттай',
                    users
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }),
        getUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const user = yield sendBird_controller_1.default.getUser(userId);
                return {
                    success: true,
                    message: 'Амжилттай',
                    user
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }),
        isActive: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const active = yield sendBird_controller_1.default.isActive(userId);
                return {
                    success: true,
                    message: 'Амжилттай',
                    active
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        })
    },
    Mutation: {
        createUserChat: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const result = yield sendBird_controller_1.default.createUserChat(userId);
                return {
                    success: true,
                    message: 'Амжилттай',
                    result
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }),
        createFriend: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const result = yield sendBird_controller_1.default.createFriend(userId);
                return {
                    success: true,
                    message: 'Амжилттай',
                    result
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }),
        sendMessage: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { channelUrl, message }) {
            try {
                const result = yield sendBird_controller_1.default.sendMessage(channelUrl, message);
                return {
                    success: true,
                    message: 'Амжилттай',
                    result
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }),
        updateMessage: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { channelUrl, message, messageId }) {
            try {
                const result = yield sendBird_controller_1.default.updateMessage(channelUrl, message, messageId);
                return {
                    success: true,
                    message: 'Амжилттай',
                    result
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }),
        deleteMessage: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { channelUrl, messageId }) {
            try {
                const result = yield sendBird_controller_1.default.deleteMessage(channelUrl, messageId);
                return {
                    success: true,
                    message: 'Амжилттай',
                    result
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }),
        joinChannel: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { channelUrl }) {
            try {
                const result = yield sendBird_controller_1.default.joinChannel(channelUrl);
                return {
                    success: true,
                    message: 'Амжилттай',
                    result
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        }),
        getChannel: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { channelUrl }) {
            try {
                const result = yield sendBird_controller_1.default.getChannel(channelUrl);
                return {
                    success: true,
                    message: 'Амжилттай',
                    result
                };
            }
            catch (error) {
                return {
                    success: false,
                    message: error.message
                };
            }
        })
    }
};
