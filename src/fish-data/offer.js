import { getRandomInt } from '../utils';
import { OFFER_TITLES, TYPES_POINT } from '../const';


const generateOfferTitle = () => OFFER_TITLES[getRandomInt(0, OFFER_TITLES.length - 1)];

const generateOffer = (id) => ({
  'id': id,
  'title': generateOfferTitle(),
  'price': getRandomInt(1,200)
});

const offersByType = [];

for (let i = 0; i < TYPES_POINT.length; i++) {
  offersByType.push({
    'type': TYPES_POINT[i],
    'offers': [generateOffer(1), generateOffer(2), generateOffer(3)]
  });
}

export default offersByType;

