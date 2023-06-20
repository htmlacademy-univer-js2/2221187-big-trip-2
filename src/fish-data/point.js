import { getRandomInt } from '../utils';
import { TYPES_POINT } from '../const';
import { nanoid } from 'nanoid';


const generatePointType = () => TYPES_POINT[getRandomInt(0, TYPES_POINT.length - 1)];

const isFavourite = () => getRandomInt() === 1;

const generatePoint = () => ({
  'id': nanoid(),
  'basePrice': getRandomInt(1, 500),
  'dateFrom': `2019-07-10T${getRandomInt(10,23)}:${getRandomInt(10,59)}:00.845Z`,
  'dateTo': `2019-07-11T${getRandomInt(10,23)}:${getRandomInt(10,59)}:00.375Z`,
  'destination': getRandomInt(0, 4),
  'isFavorite': isFavourite(),
  'offers': [1, 2],
  'type': generatePointType()
});

export default generatePoint;
