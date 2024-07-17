import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers/index';
import { typeDefs } from './schemas/index';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: resolvers.chatResolver.Query,
    Mutation: resolvers.chatResolver.Mutation
  }
});
