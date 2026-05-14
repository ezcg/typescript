import app from './app.js';
import sequelize from './config/sequelize.js';

const port = process.env.EXP_STAN_HOST_PORT || 3000;

async function bootstrap() {
  await sequelize.authenticate();
  await sequelize.sync();

  app.listen(port, () => {
    console.log(`Express app listening on port ${port}`);
  });
}

bootstrap().catch((error) => {
  console.error(error);
  process.exit(1);
});
