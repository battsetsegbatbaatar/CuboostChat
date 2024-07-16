import { makeExecutableSchema } from '@graphql-tools/schema';
import { resolvers } from './resolvers/index';
import { typeDefs } from './schemas/index';

export const schema = makeExecutableSchema({
  typeDefs,
  resolvers: {
    Query: resolvers.userResolver.Query,
    Mutation: resolvers.userResolver.Mutation
  }
});
