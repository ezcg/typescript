import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import linksRouter from './routes/links.routes.js';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..', 'views'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.get('/', (_req, res) => {
  res.redirect('/links');
});

app.use('/links', linksRouter);

app.use((err: unknown, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  const error = err as { message?: string; statusCode?: number };
  res.status(error.statusCode ?? 500).send(error.message ?? 'Internal Server Error');
});

export default app;
