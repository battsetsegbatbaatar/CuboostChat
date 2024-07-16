"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const schema_1 = require("@graphql-tools/schema");
const index_1 = require("./resolvers/index");
const index_2 = require("./schemas/index");
exports.schema = (0, schema_1.makeExecutableSchema)({
    typeDefs: index_2.typeDefs,
    resolvers: {
        Query: index_1.resolvers.userResolver.Query,
        Mutation: index_1.resolvers.userResolver.Mutation
    }
});
