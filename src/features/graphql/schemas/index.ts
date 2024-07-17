import { mergeTypeDefs } from '@graphql-tools/merge';
import { User } from './user.schema';
import { ChatUser } from './chat.schema';

export const typeDefs = mergeTypeDefs([User, ChatUser]);
