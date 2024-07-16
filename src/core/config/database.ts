import { Options, Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const options: Options = {
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: DB_PORT as unknown as number,
  dialect: 'postgres',
  host: DB_HOST,
  timezone: '+08:00',
  logging: false
};

const sequelize = new Sequelize(options);

function setupModel(sequelize: Sequelize) {
  sequelize.sync({ alter: true });
}

setupModel(sequelize);
export default sequelize;

export const connectToDatabase = async () => {
  await sequelize
    .authenticate()
    .then(async () => {
      await sequelize.sync({ alter: true, logging: false, force: false });
      console.log('Database successfully connected');
    })
    .catch((err) => console.log(`Database connection error ${err.message}`));
};
