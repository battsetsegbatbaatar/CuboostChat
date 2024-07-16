"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const merge_1 = require("@graphql-tools/merge");
const user_schema_1 = require("./user.schema");
exports.typeDefs = (0, merge_1.mergeTypeDefs)([user_schema_1.User]);
