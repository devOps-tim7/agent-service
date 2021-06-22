import supertest from 'supertest';
import { createServer } from '../../server';
import connection from '../helpers/Connection';
import PostPromotion from '../models/PostPromotion';

const app = createServer();

describe('PostPromotionController test', () => {
  it('saves the post promotions correctly', async () => {
    await connection.clear();
    await supertest(app)
      .post('/api/agent/postPromotions')
      .send({
        promotions: [
          { post_id: 'c48fb3a4-4384-4e01-b21c-5f9bffe6c361', date: new Date('2021-06-22') },
          { post_id: 'c48fb3a4-4384-4e01-b21c-5f9bffe6c361', date: new Date('2021-06-23') },
          {
            post_id: 'c48fb3a4-4384-4e01-b21c-5f9bffe6c361',
            date: new Date('2021-06-24T20:00'),
          },
        ],
      });
    const promotions = await PostPromotion.find();
    expect(promotions.length).toEqual(3);
    expect(promotions[0].post_id).toEqual('c48fb3a4-4384-4e01-b21c-5f9bffe6c361');
    expect(promotions[0].date).toEqual(new Date('2021-06-22'));
    expect(promotions[1].post_id).toEqual('c48fb3a4-4384-4e01-b21c-5f9bffe6c361');
    expect(promotions[1].date).toEqual(new Date('2021-06-23'));
    expect(promotions[2].post_id).toEqual('c48fb3a4-4384-4e01-b21c-5f9bffe6c361');
    expect(promotions[2].date).toEqual(new Date('2021-06-24T20:00'));
  });
});
