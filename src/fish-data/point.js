import { get_random_int } from '../utils';
import { TYPES_POINT } from '../const';


const generate_point_type = () => TYPES_POINT[get_random_int(0, TYPES_POINT.length - 1)];

const is_favourite = () => get_random_int() === 1;

const generate_point = () => ({
  'basePrice': get_random_int(1, 500),
  'dateFrom': `2019-07-10T${get_random_int(10,23)}:${get_random_int(10,59)}:00.845Z`,
  'dateTo': `2019-07-11T${get_random_int(10,23)}:${get_random_int(10,59)}:00.375Z`,
  'destination': get_random_int(1, 4),
  'isFavorite': is_favourite(),
  'offers': [1, 2],
  'type': generate_point_type()
});

export default generate_point;
