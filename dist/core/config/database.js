"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const options = {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    port: DB_PORT,
    dialect: 'postgres',
    host: DB_HOST,
    timezone: '+08:00',
    logging: false
};
const sequelize = new sequelize_1.Sequelize(options);
function setupModel(sequelize) {
    sequelize.sync({ alter: true });
}
setupModel(sequelize);
exports.default = sequelize;
const connectToDatabase = () => __awaiter(void 0, void 0, void 0, function* () {
    yield sequelize
        .authenticate()
        .then(() => __awaiter(void 0, void 0, void 0, function* () {
        yield sequelize.sync({ alter: true, logging: false, force: false });
        console.log('Database successfully connected');
    }))
        .catch((err) => console.log(`Database connection error ${err.message}`));
});
exports.connectToDatabase = connectToDatabase;
