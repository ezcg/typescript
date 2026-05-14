export interface DbConfig {
  host: string;
  user: string;
  password: string;
  db: string;
  dialect: 'mysql';
  pool: {
    max: number;
    min: number;
    acquire: number;
    idle: number;
  };
}

const dbConfig: DbConfig = {
  host: 'typedb',
  user: 'root',
  password: 'root',
  db: 'typedb',
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

export default dbConfig;
