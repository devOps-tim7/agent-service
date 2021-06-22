import connection from '../helpers/Connection';
import PostPromotion from '../models/PostPromotion';
import PostPromotionService from './PostPromotionService';
import PostService from './PostService';

const spy = jest.spyOn(PostService, 'bulkPromote').mockResolvedValue();

describe('PostPromotionService tests', () => {
  describe('when everything is proccessed ', () => {
    beforeEach(async () => {
      await connection.clear();

      await PostPromotion.save([
        new PostPromotion({
          post_id: 'c48fb3a4-4384-4e01-b21c-5f9bffe6c361',
          date: new Date(),
          processed: true,
        }),
        new PostPromotion({
          post_id: 'e8d3ec2b-e913-491a-a968-bc6aa8c35517',
          date: new Date(),
          processed: true,
        }),
      ]);
    });

    it('sends nothing', async () => {
      await PostPromotionService.process(new Date());
      expect(spy).toHaveBeenCalledWith([]);
    });
  });

  describe('when has all unprocessed promotions', () => {
    let promotions: PostPromotion[] = [];
    beforeEach(async () => {
      await connection.clear();

      promotions = await PostPromotion.save([
        new PostPromotion({
          post_id: 'c48fb3a4-4384-4e01-b21c-5f9bffe6c361',
          date: new Date('2021-06-21'),
          processed: false,
        }),
        new PostPromotion({
          post_id: 'e8d3ec2b-e913-491a-a968-bc6aa8c35517',
          date: new Date('2021-06-22'),
          processed: false,
        }),
        new PostPromotion({
          post_id: 'e8d3ec2b-e913-491a-a968-bc6aa8c35517',
          date: new Date('2021-06-25'),
          processed: false,
        }),
      ]);
    });

    it('processes promotions before the specified date', async () => {
      await PostPromotionService.process(new Date('2021-06-23'));
      const promo1 = await PostPromotion.findOne(promotions[0].id);
      const promo2 = await PostPromotion.findOne(promotions[1].id);
      const promo3 = await PostPromotion.findOne(promotions[2].id);

      expect(promo1.processed).toEqual(true);
      expect(promo2.processed).toEqual(true);
      expect(promo3.processed).toEqual(false);

      expect(spy).toHaveBeenCalledWith([promo1, promo2]);
    });
  });

  describe('when has some unprocessed, some processed promotions', () => {
    let promotions: PostPromotion[] = [];
    beforeEach(async () => {
      await connection.clear();

      promotions = await PostPromotion.save([
        new PostPromotion({
          post_id: 'c48fb3a4-4384-4e01-b21c-5f9bffe6c361',
          date: new Date('2021-06-21'),
          processed: false,
        }),
        new PostPromotion({
          post_id: 'e8d3ec2b-e913-491a-a968-bc6aa8c35517',
          date: new Date('2021-06-22'),
          processed: true,
        }),
        new PostPromotion({
          post_id: 'e8d3ec2b-e913-491a-a968-bc6aa8c35517',
          date: new Date('2021-06-25'),
          processed: false,
        }),
      ]);
    });

    it('processes promotions before the specified date', async () => {
      await PostPromotionService.process(new Date('2021-06-30'));
      const promo1 = await PostPromotion.findOne(promotions[0].id);
      const promo2 = await PostPromotion.findOne(promotions[1].id);
      const promo3 = await PostPromotion.findOne(promotions[2].id);

      expect(promo1.processed).toEqual(true);
      expect(promo2.processed).toEqual(true);
      expect(promo3.processed).toEqual(true);

      expect(spy).toHaveBeenCalledWith([promo1, promo3]);
    });
  });
});
