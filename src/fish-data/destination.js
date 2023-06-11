import { get_random_int } from '../utils';
import { CITIES, DESCRIPTIONS } from '../const';


const generate_description = () => {
  const random_length = get_random_int(0, DESCRIPTIONS.length - 1);
  const random_description = [];

  for (let i = 0; i < random_length - 1; i++) {
    random_description[i] = DESCRIPTIONS[get_random_int(0, DESCRIPTIONS.length - 1)];
  }

  return random_description;
};

const generate_city = () => CITIES[get_random_int(0, CITIES.length - 1)];

const generate_src = () => `http://picsum.photos/300/200?r=${get_random_int(1, 20)}`;

const generate_photo = () => ({
  'src': generate_src(),
  'description': generate_description()
});

const generate_destination = (id) => ({
  'id': id,
  'description': generate_description(),
  'name': generate_city(),
  'pictures': Array.from({length: get_random_int(1,6)}, generate_photo)
});

const Destinations = [
  generate_destination(1),
  generate_destination(2),
  generate_destination(3),
  generate_destination(4)
];

export default Destinations;
