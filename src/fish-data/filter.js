import { filter } from '../utils';

const generateFilter = (points) => Object.entries(filter).map(
  ([filterName, filterPoint]) => ({
    name: filterName,
    sequence: filterPoint(points),
  }),
);

export default generateFilter;
