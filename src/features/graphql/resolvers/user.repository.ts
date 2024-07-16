import { ValidationError } from 'apollo-server-express';
import UserController from '../../controller/user/user.controller';
import { User } from '../../../core/types/user/user.type';

export const userResolver = {
  Query: {
    getUsers: async () => {
      try {
        const users = await UserController.getUsers();
        if (!users) {
          throw new ValidationError('No users found');
        }
        return users;
      } catch (error) {
        console.error('Error fetching users:', error);
        throw new ValidationError('Failed to fetch users');
      }
    },
    getUserById: async (_: any, { userId }: { userId: string }) => {
      try {
        const user = await UserController.getUserId(userId);
        if (!user) {
          throw new ValidationError(`User not found`);
        }
        return user;
      } catch (error) {
        console.error('Error fetching user by ID:', error);
        throw new ValidationError('Failed to fetch user by ID');
      }
    },
    signIn: async (
      _: any,
      { email, password }: { email: string; password: string }
    ) => {
      try {
        return await UserController.signIn(email, password);
      } catch (error) {
        console.error('Error');
        throw new ValidationError('Failed not to match user');
      }
    }
  },
  Mutation: {
    createUser: async (_: any, { input }: { input: User }) => {
      try {
        const { user, token } = await UserController.createUser(input);
        return { user, token };
      } catch (error) {
        console.error('Error updating user:', error);
        throw new ValidationError('Failed to update user');
      }
    },
    updateUser: async (
      _: any,
      { input, userId }: { input: User; userId: string }
    ) => {
      try {
        return await UserController.updateUser(userId, input);
      } catch (error) {
        console.error('Error updating user:', error);
        throw new ValidationError('Failed to update user');
      }
    },
    deleteUser: async (_: any, { userId }: { userId: string }) => {
      try {
        return await UserController.deleteUser(userId);
      } catch (error) {
        console.error('Error deleting user:', error);
        throw new ValidationError('Failed to delete user');
      }
    }
  }
};
