import { DataTypes, Model } from 'sequelize';
import sequelize from '../../../core/config/database';
import { ROLES } from '../../../core/types/user/user.type';

export class UserModel extends Model {
  public id!: string;
  public firstName!: string;
  public lastName!: string;
  public email!: string;
  public password!: string;
  public role!: ROLES;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM(...Object.values(ROLES)),
      defaultValue: ROLES.CREATOR,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'UserModel',
    tableName: 'UserModel'
  }
);

export default UserModel;
