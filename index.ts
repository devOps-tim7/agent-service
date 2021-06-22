import dotenv from 'dotenv';
dotenv.config();
import { createConnection } from 'typeorm';
import { createServer } from './server';
import connection from './src/helpers/Connection';
import cron from 'node-cron';
import PostPromotionService from './src/services/PostPromotionService';

createConnection()
  .then(() => connection.clear())
  .then(async () => {
    const app = createServer();

    cron.schedule(process.env.SCHEDULE_STRING, () => {
      PostPromotionService.process(new Date());
    });

    const port = process.env.PORT;

    app.listen(port, () => {
      console.log(`Server has started at http://localhost:${port}`);
    });
  });
