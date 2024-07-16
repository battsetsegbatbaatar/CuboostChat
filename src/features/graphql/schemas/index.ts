import { mergeTypeDefs } from '@graphql-tools/merge';
import { User } from './user.schema';

export const typeDefs = mergeTypeDefs([User]);
