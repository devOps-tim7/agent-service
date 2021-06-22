require('express-async-errors');
import express from 'express';
import cors from 'cors';
import errorHandler from './src/middleware/ErrorHandler';
import PostPromotionRoutes from './src/routes/PostPromotion';
import MetricsMiddleware from './src/middleware/MetricsMiddleware';

export const createServer = () => {
  const app = express();
  app.use(express.json({ limit: '8mb' }));
  app.use(cors());
  app.use(MetricsMiddleware);
  app.use('/api/agent/postPromotions', PostPromotionRoutes);
  app.use(errorHandler);
  return app;
};
