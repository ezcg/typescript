import path from 'path';
import { fileURLToPath } from 'url';
import fastifyFactory from 'fastify';
import formbody from '@fastify/formbody';
import fastifyStatic from '@fastify/static';
import fastifyView from '@fastify/view';
import ejs from 'ejs';
import { linksRoutes } from './routes/links.routes.js';

const app = fastifyFactory({
  logger: false
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

await app.register(formbody);
await app.register(fastifyStatic, {
  root: path.join(__dirname, '..', 'public'),
  prefix: '/public/'
});
await app.register(fastifyView, {
  engine: {
    ejs
  },
  root: path.join(__dirname, '..', 'views')
});

app.get('/', async (_request, reply) => reply.redirect('/links'));
await app.register(linksRoutes, { prefix: '/links' });

app.setErrorHandler((error, _request, reply) => {
  const statusCode = (error as { statusCode?: number }).statusCode ?? 500;
  const message = error instanceof Error ? error.message : 'Internal Server Error';
  reply.status(statusCode).send(message);
});

export default app;
