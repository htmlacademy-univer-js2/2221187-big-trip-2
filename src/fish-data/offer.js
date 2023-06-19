import { get_random_int } from '../utils';
import { OFFER_TITLES, TYPES_POINT } from '../const';


const generate_offer_title = () => OFFER_TITLES[get_random_int(0, OFFER_TITLES.length - 1)];

const generate_offer = (id) => ({
  'id': id,
  'title': generate_offer_title(),
  'price': get_random_int(1,200)
});

let offers_by_type = [];

for (let i = 0; i < TYPES_POINT.length; i++) {
  offers_by_type.push({
    'type': TYPES_POINT[i],
    'offers': [generate_offer(1), generate_offer(2), generate_offer(3)]
  });
}

const OffersByType = offers_by_type;


export default OffersByType;

