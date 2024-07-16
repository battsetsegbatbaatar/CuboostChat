import dotenv from 'dotenv';
import { User } from '../../../core/types/user/user.type';
import { UserModel } from '../../shared/models/user.model';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import CryptoJS from 'crypto-js';
import { LogLevel } from 'sendbird';
import SendbirdChat, {
  CachedDataClearOrder,
  LocalCacheConfig
} from '@sendbird/chat';
import { BaseMessage } from '@sendbird/chat/message';

dotenv.config();

const ENCRYPTION_KEY = 'encryption-key';
const { APP_ID, DB_HOST, JWT_TOKEN_SALT, JWT_EXPIRATION } = process.env;

export default class UserController {
  static async _generateJwt(id: string): Promise<string> {
    const jwtPayload = { id };

    if (!JWT_TOKEN_SALT) {
      throw new Error('JWT_TOKEN_SALT is not defined');
    }

    const jwtToken = jwt.sign(jwtPayload, JWT_TOKEN_SALT, {
      expiresIn: JWT_EXPIRATION
    });

    return jwtToken;
  }

  static async _verifyJwt(token: string) {
    if (!JWT_TOKEN_SALT) {
      throw new Error('JWT_TOKEN_SALT is not defined');
    }

    try {
      const jwtObject = jwt.verify(token, JWT_TOKEN_SALT);
      return jwtObject;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }

  static async getUsers(): Promise<UserModel[]> {
    return await UserModel.findAll();
  }

  static async getUserId(userId: string): Promise<UserModel | null> {
    return await UserModel.findOne({ where: { id: userId } });
  }

  static async signIn(email: string, password: string) {
    if (!password) throw new Error('Password is required');

    const user = await UserModel.findOne({ where: { email } });
    if (!user) throw new Error('User not found');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid password');

    const token = await this._generateJwt(user.id);
    return { user, token };
  }

  static async createUser(
    userInput: User
  ): Promise<{ user: UserModel; token: string }> {
    const { firstName, lastName, email, password } = userInput;

    if (!password || typeof password !== 'string') {
      throw new Error('Invalid password');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const existingUser = await UserModel.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('Email already exists');
      }

      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role: 'CREATOR'
      });

      const token = await this._generateJwt(user.id);
      const params: any = {
        appId: APP_ID,
        localCacheEnabled: true,
        localCacheEncryption: {
          encrypt: (rawData: any) => {
            const encryptedData = CryptoJS.AES.encrypt(
              JSON.stringify(rawData),
              ENCRYPTION_KEY
            ).toString();
            return { key: encryptedData };
          },
          decrypt: (encryptedData: any) => {
            const decryptedData = CryptoJS.AES.decrypt(
              encryptedData.key,
              ENCRYPTION_KEY
            ).toString(CryptoJS.enc.Utf8);
            return JSON.parse(decryptedData);
          }
        },
        localCacheConfig: new LocalCacheConfig({
          maxSize: 256,
          clearOrder: CachedDataClearOrder.MESSAGE_COLLECTION_ACCESSED_AT
        }),
        modules: [new BaseMessage()],
        logLevel: LogLevel.WARN,
        customApiHost: DB_HOST
      };

      const sb: SendbirdChat = SendbirdChat.init(params);
      console.log('SendbirdChat initialized:', sb);
      const sendbirdUser = await sb.connect(user.id);
      console.log('Sendbird user connected:', sendbirdUser);

      return { user, token };
    } catch (error) {
      if (
        error instanceof Error &&
        error.message.includes('Email already exists')
      ) {
        throw new Error('Email already exists');
      }
      throw error;
    }
  }

  static async updateUser(userId: string, userInput: User) {
    const { firstName, lastName, email } = userInput;
    return await UserModel.update(
      {
        firstName,
        lastName,
        email
      },
      { where: { id: userId } }
    );
  }

  static async deleteUser(userId: string) {
    try {
      return await UserModel.destroy({ where: { id: userId } });
    } catch (error) {
      throw new Error('Error deleting user');
    }
  }
}
