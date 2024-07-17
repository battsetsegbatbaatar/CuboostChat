"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resolvers = void 0;
const user_repository_1 = require("./user.repository");
const chat_respository_1 = require("./chat.respository");
exports.resolvers = {
    userResolver: user_repository_1.userResolver,
    chatResolver: chat_respository_1.chatResolver
};
