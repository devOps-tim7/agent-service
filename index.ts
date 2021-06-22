import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'typeorm';
import { createServer } from './server';
import connection from './src/helpers/Connection';
import cron from 'node-cron';
import PostPromotionService from './src/services/PostPromotionService';
import RequestStatsMiddleware from './src/middleware/RequestStatsMiddleware'

createConnection()
  .then(() => connection.clear())
  .then(async () => {
    const app = createServer();

    cron.schedule(process.env.SCHEDULE_STRING, () => {
      PostPromotionService.process(new Date());
    });

    const port = process.env.PORT;

    const server = app.listen(port, () => {
      console.log(`Server has started at http://localhost:${port}`);
    });
    RequestStatsMiddleware(server)    
  });
