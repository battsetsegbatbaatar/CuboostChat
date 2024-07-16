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
exports.userResolver = void 0;
const apollo_server_express_1 = require("apollo-server-express");
const user_controller_1 = __importDefault(require("../../controller/user/user.controller"));
exports.userResolver = {
    Query: {
        getUsers: () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const users = yield user_controller_1.default.getUsers();
                if (!users) {
                    throw new apollo_server_express_1.ValidationError('No users found');
                }
                return users;
            }
            catch (error) {
                console.error('Error fetching users:', error);
                throw new apollo_server_express_1.ValidationError('Failed to fetch users');
            }
        }),
        getUserById: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                const user = yield user_controller_1.default.getUserId(userId);
                if (!user) {
                    throw new apollo_server_express_1.ValidationError(`User not found`);
                }
                return user;
            }
            catch (error) {
                console.error('Error fetching user by ID:', error);
                throw new apollo_server_express_1.ValidationError('Failed to fetch user by ID');
            }
        }),
        signIn: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { email, password }) {
            try {
                return yield user_controller_1.default.signIn(email, password);
            }
            catch (error) {
                console.error('Error');
                throw new apollo_server_express_1.ValidationError('Failed not to match user');
            }
        })
    },
    Mutation: {
        createUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input }) {
            try {
                const { user, token } = yield user_controller_1.default.createUser(input);
                return { user, token };
            }
            catch (error) {
                console.error('Error updating user:', error);
                throw new apollo_server_express_1.ValidationError('Failed to update user');
            }
        }),
        updateUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { input, userId }) {
            try {
                return yield user_controller_1.default.updateUser(userId, input);
            }
            catch (error) {
                console.error('Error updating user:', error);
                throw new apollo_server_express_1.ValidationError('Failed to update user');
            }
        }),
        deleteUser: (_1, _a) => __awaiter(void 0, [_1, _a], void 0, function* (_, { userId }) {
            try {
                return yield user_controller_1.default.deleteUser(userId);
            }
            catch (error) {
                console.error('Error deleting user:', error);
                throw new apollo_server_express_1.ValidationError('Failed to delete user');
            }
        })
    }
};
