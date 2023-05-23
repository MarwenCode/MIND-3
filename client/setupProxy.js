import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app) {
  app.use(
    '/socket.io',
    createProxyMiddleware({
      target: 'http://localhost:8000',
      ws: true,
      changeOrigin: true,
    })
  );
};
