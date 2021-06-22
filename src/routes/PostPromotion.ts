import express from 'express';
import PostPromotionController from '../controllers/PostPromotionController';

const router = express.Router();

router.post('/', PostPromotionController.create);
router.get('/', PostPromotionController.getAll);

export default router;
