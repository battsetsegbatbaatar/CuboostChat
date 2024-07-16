import { gql } from 'apollo-server-express';

export const User = gql`
  enum ROLES_ENUM {
    ADMIN
    COMPANY
    AGENCY
    CREATOR
  }

  type User {
    id: ID
    firstName: String
    lastName: String
    email: String
    password: String
    role: ROLES_ENUM
  }

  input UserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }

  input UpdateInput {
    firstName: String
    lastName: String
    email: String
  }

  type AuthPayload {
    user: User!
    token: String!
  }

  type Query {
    getUsers: [User]
    getUserById(userId: ID!): User
    signIn(email: String!, password: String!): AuthPayload
  }

  type Mutation {
    createUser(input: UserInput!): AuthPayload!
    updateUser(input: UpdateInput!, userId: ID!): User!
    deleteUser(userId: ID!): User
  }
`;
