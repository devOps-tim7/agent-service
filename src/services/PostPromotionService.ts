import { LessThan } from 'typeorm';
import PostPromotion from '../models/PostPromotion';
import PostService from './PostService';

const process = async (exposureDate: Date) => {
  const promotions = await PostPromotion.find({
    where: { processed: false, date: LessThan(exposureDate) },
  });

  await PostService.bulkPromote(promotions);

  for (let i = 0; i < promotions.length; i++) {
    const promotion = promotions[i];
    promotion.processed = true;
  }

  await PostPromotion.save(promotions);
};

export default { process };
