const devObj = {
  host: 'typedb',
  user: "root",
  password: "root",
  db: "typedb",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};

const moduleExport = devObj;

export default moduleExport;
