"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sb = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../../../core/config/database"));
class sb extends sequelize_1.Model {
}
exports.sb = sb;
sb.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        primaryKey: true
    },
    nickname: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    friendDiscoveryKey: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    },
    lastSeenAt: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    plainProfileUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    preferredLanguages: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    requireAuth: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true
    }
}, {
    sequelize: database_1.default,
    modelName: 'sb',
    tableName: 'sendbirdchat'
});
exports.default = sb;
