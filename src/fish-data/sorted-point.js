import { sortedPoints } from "../utils";

const generateSortedPoints = (points) => Object.entries(sortedPoints).map(
    ([sortedName, sortedPoints]) => ({
      name: sortedName,
      sequence: sortedPoints(points),
    }),
  );

export default generateSortedPoints;