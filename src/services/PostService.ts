import axios from 'axios';
import PostPromotion from '../models/PostPromotion';

const BASE = 'http://gateway:8000';

const bulkPromote = async (postPromotions: PostPromotion[]) => {
  if (postPromotions.length === 0) {
    return;
  }

  const toSend = { promotions: postPromotions };

  await axios.post(`${BASE}/api/posts/promote`, toSend);
};

export default { bulkPromote };
