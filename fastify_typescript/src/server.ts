import app from './app.js';
import { sequelize } from './models/index.js';

const port = Number(process.env.FAS_TYPE_HOST_PORT ?? 3000);

async function bootstrap(): Promise<void> {
  await sequelize.authenticate();
  await sequelize.sync();

  await app.listen({ port, host: '0.0.0.0' });
  // eslint-disable-next-line no-console
  console.log(`Fastify app listening on port ${port}`);
}

bootstrap().catch((error: unknown) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});
