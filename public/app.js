"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const apollo_server_express_1 = require("apollo-server-express");
const apollo_server_core_1 = require("apollo-server-core");
const http_1 = __importDefault(require("http"));
const database_1 = require("./core/config/database");
const index_1 = require("./features/graphql/index");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const httpServer = http_1.default.createServer(app);
const server = new apollo_server_express_1.ApolloServer({
    schema: index_1.schema,
    introspection: true,
    plugins: [(0, apollo_server_core_1.ApolloServerPluginDrainHttpServer)({ httpServer })]
});
Promise.all([(0, database_1.connectToDatabase)(), server.start()])
    .then(() => {
    server.applyMiddleware({ app: app });
    httpServer.listen({ port: 4000 }, () => {
        console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
})
    .catch((error) => {
    console.error('Failed to start server:', error);
});
