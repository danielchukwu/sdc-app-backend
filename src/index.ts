import app from './app';

const server = Bun.serve({
  port: process.env.NODE_ENV ?? 3000,
  fetch: app.fetch,
});

// console.log(server);
console.log(`Listening on ${server.url}`)