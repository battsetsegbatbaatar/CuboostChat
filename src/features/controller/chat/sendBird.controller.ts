import dotenv from 'dotenv';
import SendBird, { User } from 'sendbird';

dotenv.config();

const sb = new SendBird({ appId: process.env.SENDBIRD_APP_ID as string });

export default class ChatController {
  static async connection(userId: string) {
    return new Promise((resolve, reject) => {
      sb.connect(userId, (user, error) => {
        if (error) {
          console.error('Connection failed', error);
          reject(error);
        } else {
          console.log('Connected', user);
          resolve(user);
        }
      });
    });
  }

  static async getListUser() {
    return new Promise((resolve, reject) => {
      const query = sb.createApplicationUserListQuery();
      query.next((users, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(users);
        }
      });
    });
  }

  static async getUser(userId: string) {
    return new Promise((resolve, reject) => {
      sb.connect(userId, (user, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(user);
        }
      });
    });
  }

  static async createUserChat(userId: string) {
    const user = await this.getUser(userId);
    return new Promise((resolve, reject) => {
      sb.setChannelInvitationPreference(true, (response, error) => {
        if (error) {
          reject(error);
        } else {
          resolve({ user, channel: response });
        }
      });
    });
  }

  //   static async updateUserChat(
  //     userId: string,
  //     userDetails: { lastName: string; url: string }
  //   ) {
  //     const user: any = await this.getUser(userId);
  //     return new Promise((resolve, reject) => {
  //       user.updateCurrentUserInfo(
  //         { nickname: userDetails.lastName, profileUrl: userDetails.url },
  //         (response, error) => {
  //           if (error) {
  //             reject(error);
  //           } else {
  //             resolve(response);
  //           }
  //         }
  //       );
  //     });
  //   }

  static async isActive(userId: string) {
    const user: any = await this.getUser(userId);
    return user.isActive;
  }

  static async createFriend(userId: string) {
    const userIds = [userId];
    return new Promise((resolve, reject) => {
      sb.addFriends(userIds, (response, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  static async sendMessage(channelUrl: string, message: string) {
    const channel: any = await this.getChannel(channelUrl);
    return new Promise((resolve, reject) => {
      channel.sendUserMessage(message, (msg: unknown, error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(msg);
        }
      });
    });
  }

  static async updateMessage(
    channelUrl: string,
    messageId: string,
    message: string
  ) {
    const channel: any = await this.getChannel(channelUrl);
    return new Promise((resolve, reject) => {
      channel.updateUserMessage(
        messageId,
        message,
        (msg: unknown, error: any) => {
          if (error) {
            reject(error);
          } else {
            resolve(msg);
          }
        }
      );
    });
  }

  static async deleteMessage(channelUrl: string, messageId: string) {
    const channel: any = await this.getChannel(channelUrl);
    return new Promise((resolve, reject) => {
      channel.deleteMessage(messageId, (response: unknown, error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  static async joinChannel(channelUrl: string) {
    const channel: any = await this.getChannel(channelUrl);
    return new Promise((resolve, reject) => {
      channel.enter((response: unknown, error: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(response);
        }
      });
    });
  }

  static async getChannel(channelUrl: string) {
    return new Promise((resolve, reject) => {
      sb.GroupChannel.getChannel(channelUrl, (channel, error) => {
        if (error) {
          reject(error);
        } else {
          resolve(channel);
        }
      });
    });
  }
}
