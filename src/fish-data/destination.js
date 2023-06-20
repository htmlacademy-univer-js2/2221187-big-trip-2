import { getRandomInt } from '../utils';
import { CITIES, DESCRIPTIONS } from '../const';


const generateDescription = () => {
  const randomLength = getRandomInt(0, DESCRIPTIONS.length - 1);
  const randomDestination = [];

  for (let i = 0; i < randomLength - 1; i++) {
    randomDestination[i] = DESCRIPTIONS[getRandomInt(0, DESCRIPTIONS.length - 1)];
  }

  return randomDestination;
};

const generateCity = (id) => CITIES.find(x => x.id === id)['name'];

const generateSrc = () => `http://picsum.photos/300/200?r=${getRandomInt(1, 20)}`;

const generatePhoto = () => ({
  'src': generateSrc(),
  'description': generateDescription()
});

const generateDestination = (id) => ({
  'id': id,
  'description': generateDescription(),
  'name': generateCity(id),
  'pictures': Array.from({length: getRandomInt(1,6)}, generatePhoto)
});

const Destinations = [
  generateDestination(0),
  generateDestination(1),
  generateDestination(2),
  generateDestination(3),
  generateDestination(4)
];

export default Destinations;
