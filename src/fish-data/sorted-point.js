import { sortedPoints } from '../utils';

const generateSortedPoints = (points) => Object.entries(sortedPoints).map(
  ([sortedName, sortedPoints1]) => ({
    name: sortedName,
    sequence: sortedPoints1(points),
  }),
);

export default generateSortedPoints;
