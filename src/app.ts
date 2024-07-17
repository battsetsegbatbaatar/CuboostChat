import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core';
import http from 'http';
import { connectToDatabase } from './core/config/database';
import { schema } from './features/graphql/index';
import dotenv from 'dotenv';

dotenv.config();

const app: Application = express();
app.use(express.json());

const httpServer = http.createServer(app);

const server = new ApolloServer({
  schema,
  introspection: true,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

Promise.all([connectToDatabase(), server.start()])
  .then(() => {
    server.applyMiddleware({ app: app as any });

    httpServer.listen({ port: 4000 }, () => {
      console.log(`Server ready at http://localhost:4000${server.graphqlPath}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
  });
