import dotenv from 'dotenv';
import CryptoJS from 'crypto-js';
import SendbirdChat, {
  CachedDataClearOrder,
  LocalCacheConfig
} from '@sendbird/chat';
import { BaseMessage } from '@sendbird/chat/message';

dotenv.config();

const ENCRYPTION_KEY = 'encryption-key';
const { APP_ID, DB_HOST } = process.env;

if (!APP_ID) {
  throw new Error('APP_ID environment variable is not defined.');
}

if (!DB_HOST) {
  throw new Error('DB_HOST environment variable is not defined.');
}

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
  customApiHost: DB_HOST
};

const sbChat: SendbirdChat = SendbirdChat.init(params);

console.log('SendbirdChat initialized:', sbChat);
export default sbChat;
