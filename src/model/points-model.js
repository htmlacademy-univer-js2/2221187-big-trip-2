import generatePoint from '../fish-data/point';
import { COUNT_POINT } from '../const';

class PointsModel {
  constructor() {
    this.points = Array.from({length: COUNT_POINT}, generatePoint);
  }

  getPoints() {
    return this.points;
  }
}

export default PointsModel;
