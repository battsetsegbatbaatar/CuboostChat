"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatUser = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.ChatUser = (0, apollo_server_express_1.gql) `
  type chatUser {
    id: String;
    nickname: String;
    friendDiscoveryKey: String;
    isActive: boolean;
    lastSeenAt: Int;
    plainProfileUrl: String;
    preferredLanguages: String;
    requireAuth: boolean;
  }

  type Query {
    getListUser: [chatUser]
    getUser(userId: ID!): chatUser
    isActive(userId: ID!): Boolean
  }

  type Mutation {
    createUserChat(userId: ID!): chatUser!
    createFriend(userId: ID!): chatUser!
    sendMessage(channelUrl: string!; message: string! ): chatUser
    updateMessage(channelUrl: string!; message: string!; messageId: string! ): chatUser
    deleteMessage(channelUrl: string!; messageId: string! ): chatUser
    joinChannel(channelUrl: string! ): chatUser
    getChannel(channelUrl: string! ): chatUser
  }
`;
