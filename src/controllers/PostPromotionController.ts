import { Request, Response } from 'express';
import PostPromotion from '../models/PostPromotion';

const create = async (req: Request, res: Response) => {
  const promotions: PostPromotion[] = req.body.promotions;

  for (let i = 0; i < promotions.length; i++) {
    const promotion = promotions[i];

    const toSave = new PostPromotion(promotion);
    await toSave.save();
  }

  res.status(201).end();
};

const getAll = async (_req: Request, res: Response) => {
  const promotions = await PostPromotion.find();
  res.send(promotions);
};

export default { create, getAll };
