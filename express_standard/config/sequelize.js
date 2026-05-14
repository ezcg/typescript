import { Sequelize } from 'sequelize';
import dbConfig from '../db.config.js';

const sequelize = new Sequelize(dbConfig.db, dbConfig.user, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  pool: dbConfig.pool,
  logging: false
});

export default sequelize;
