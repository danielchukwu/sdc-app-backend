import { Hono } from 'hono';
import cases from './routes/cases';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';

const app = new Hono();

// middlewares
app.use(cors());
app.use(logger());

// routes
app.get('/', (c) => c.json({ message: 'Bun & Hono = 🔥' }));
app.route('/cases', cases);

// not found
app.notFound((c) => c.json({ message: 'Not found 😔'}))

export default app;