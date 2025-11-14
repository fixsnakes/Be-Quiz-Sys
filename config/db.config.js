import 'dotenv/config.js'; // Tải biến môi trường
import { Sequelize } from 'sequelize';

const dbConfig = {
  HOST: process.env.DB_HOST,
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_NAME,
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const sequelize = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host:dbConfig.HOST,
    dialect: dbConfig.dialect,
    pool: dbConfig.pool
  }
)


export default sequelize;