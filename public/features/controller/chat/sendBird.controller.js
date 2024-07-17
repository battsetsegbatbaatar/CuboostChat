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
const dotenv_1 = __importDefault(require("dotenv"));
const sendbird_1 = __importDefault(require("sendbird"));
dotenv_1.default.config();
const sb = new sendbird_1.default({ appId: process.env.SENDBIRD_APP_ID });
class ChatController {
    static connection(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                sb.connect(userId, (user, error) => {
                    if (error) {
                        console.error('Connection failed', error);
                        reject(error);
                    }
                    else {
                        console.log('Connected', user);
                        resolve(user);
                    }
                });
            });
        });
    }
    static getListUser() {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                const query = sb.createApplicationUserListQuery();
                query.next((users, error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(users);
                    }
                });
            });
        });
    }
    static getUser(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                sb.connect(userId, (user, error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(user);
                    }
                });
            });
        });
    }
    static createUserChat(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(userId);
            return new Promise((resolve, reject) => {
                sb.setChannelInvitationPreference(true, (response, error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve({ user, channel: response });
                    }
                });
            });
        });
    }
    //   static async updateUserChat(
    //     userId: string,
    //     userDetails: { lastName: string; url: string }
    //   ) {
    //     const user: any = await this.getUser(userId);
    //     return new Promise((resolve, reject) => {
    //       user.updateCurrentUserInfo(
    //         { nickname: userDetails.lastName, profileUrl: userDetails.url },
    //         (response, error) => {
    //           if (error) {
    //             reject(error);
    //           } else {
    //             resolve(response);
    //           }
    //         }
    //       );
    //     });
    //   }
    static isActive(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.getUser(userId);
            return user.isActive;
        });
    }
    static createFriend(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const userIds = [userId];
            return new Promise((resolve, reject) => {
                sb.addFriends(userIds, (response, error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(response);
                    }
                });
            });
        });
    }
    static sendMessage(channelUrl, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.getChannel(channelUrl);
            return new Promise((resolve, reject) => {
                channel.sendUserMessage(message, (msg, error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(msg);
                    }
                });
            });
        });
    }
    static updateMessage(channelUrl, messageId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.getChannel(channelUrl);
            return new Promise((resolve, reject) => {
                channel.updateUserMessage(messageId, message, (msg, error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(msg);
                    }
                });
            });
        });
    }
    static deleteMessage(channelUrl, messageId) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.getChannel(channelUrl);
            return new Promise((resolve, reject) => {
                channel.deleteMessage(messageId, (response, error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(response);
                    }
                });
            });
        });
    }
    static joinChannel(channelUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.getChannel(channelUrl);
            return new Promise((resolve, reject) => {
                channel.enter((response, error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(response);
                    }
                });
            });
        });
    }
    static getChannel(channelUrl) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
                    if (error) {
                        reject(error);
                    }
                    else {
                        resolve(channel);
                    }
                });
            });
        });
    }
}
exports.default = ChatController;
