import { Hono } from 'hono';
import cases from './routes/cases';
import { logger } from 'hono/logger';
import { cors } from 'hono/cors';
import { handle } from 'hono/vercel'

export const config = { runtime: 'edge' }

export const runtime = 'edge';

const app = new Hono();

// middlewares
app.use(cors());
app.use(logger());

// routes
app.get('/', (c) => c.json({ message: 'Bun & Hono = 🔥' }));
app.route('/cases', cases);

// not found
app.notFound((c) => c.json({ message: 'Not found 😔'}))

export default handle(app);