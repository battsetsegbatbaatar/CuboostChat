import sendBirdController from '../../controller/chat/sendBird.controller';

export const chatResolver = {
  Query: {
    getListUser: async () => {
      try {
        const users = await sendBirdController.getListUser();
        return {
          success: true,
          message: 'Амжилттай',
          users
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    },
    getUser: async (_: any, { userId }: { userId: string }) => {
      try {
        const user = await sendBirdController.getUser(userId);
        return {
          success: true,
          message: 'Амжилттай',
          user
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    },
    isActive: async (_: any, { userId }: { userId: string }) => {
      try {
        const active = await sendBirdController.isActive(userId);
        return {
          success: true,
          message: 'Амжилттай',
          active
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    }
  },
  Mutation: {
    createUserChat: async (_: any, { userId }: { userId: string }) => {
      try {
        const result = await sendBirdController.createUserChat(userId);
        return {
          success: true,
          message: 'Амжилттай',
          result
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    },
    createFriend: async (_: any, { userId }: { userId: string }) => {
      try {
        const result = await sendBirdController.createFriend(userId);
        return {
          success: true,
          message: 'Амжилттай',
          result
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    },
    sendMessage: async (
      _: any,
      { channelUrl, message }: { channelUrl: string; message: string }
    ) => {
      try {
        const result = await sendBirdController.sendMessage(
          channelUrl,
          message
        );
        return {
          success: true,
          message: 'Амжилттай',
          result
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    },
    updateMessage: async (
      _: any,
      {
        channelUrl,
        message,
        messageId
      }: { channelUrl: string; message: string; messageId: string }
    ) => {
      try {
        const result = await sendBirdController.updateMessage(
          channelUrl,
          message,
          messageId
        );
        return {
          success: true,
          message: 'Амжилттай',
          result
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    },
    deleteMessage: async (
      _: any,
      { channelUrl, messageId }: { channelUrl: string; messageId: string }
    ) => {
      try {
        const result = await sendBirdController.deleteMessage(
          channelUrl,
          messageId
        );
        return {
          success: true,
          message: 'Амжилттай',
          result
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    },
    joinChannel: async (_: any, { channelUrl }: { channelUrl: string }) => {
      try {
        const result = await sendBirdController.joinChannel(channelUrl);
        return {
          success: true,
          message: 'Амжилттай',
          result
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    },
    getChannel: async (_: any, { channelUrl }: { channelUrl: string }) => {
      try {
        const result = await sendBirdController.getChannel(channelUrl);
        return {
          success: true,
          message: 'Амжилттай',
          result
        };
      } catch (error: any) {
        return {
          success: false,
          message: error.message
        };
      }
    }
  }
};
