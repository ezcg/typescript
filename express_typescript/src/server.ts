import app from './app.js';
import { sequelize } from './models/index.js';

const port = Number(process.env.EXP_TYPE_HOST_PORT ?? 3000);

async function bootstrap(): Promise<void> {
  await sequelize.authenticate();
  await sequelize.sync();

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`Express app listening on port ${port}`);
  });
}

bootstrap().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
