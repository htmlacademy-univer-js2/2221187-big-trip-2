import { sorting } from "../utils";

const generateSorting = (points) => Object.entries(sorting).map(
    ([sortedName, sortedPoints]) => ({
      name: sortedName,
      sequence: sortedPoints(points),
    }),
  );

export default generateSorting;