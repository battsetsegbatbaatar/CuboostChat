import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../core/config/database';
import { ROLES } from '../../../core/types/user/user.type';

export class sb extends Model {
  public id!: string;
  public nickname!: string;
  public friendDiscoveryKey!: string;
  public isActive!: boolean;
  public lastSeenAt!: number;
  public plainProfileUrl!: string;
  public preferredLanguages!: string;
  public requireAuth!: boolean;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

sb.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    nickname: {
      type: DataTypes.STRING,
      allowNull: true
    },
    friendDiscoveryKey: {
      type: DataTypes.STRING,
      allowNull: true
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    lastSeenAt: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    plainProfileUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    preferredLanguages: {
      type: DataTypes.STRING,
      allowNull: true
    },
    requireAuth: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'sb',
    tableName: 'sendbirdchat'
  }
);

export default sb;
