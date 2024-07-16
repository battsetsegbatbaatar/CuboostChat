"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../../core/config/database"));
const user_type_1 = require("../../../core/types/user/user.type");
class UserModel extends sequelize_1.Model {
}
exports.UserModel = UserModel;
UserModel.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    role: {
        type: sequelize_1.DataTypes.ENUM(...Object.values(user_type_1.ROLES)),
        defaultValue: user_type_1.ROLES.CREATOR,
        allowNull: true
    }
}, {
    sequelize: database_1.default,
    modelName: 'UserModel',
    tableName: 'UserModel'
});
exports.default = UserModel;
