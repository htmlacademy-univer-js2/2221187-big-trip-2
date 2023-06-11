import generate_point from '../fish-data/point';
import OffersByType from '../fish-data/offer';
import Destinations from '../fish-data/destination';
import { COUNT_POINT } from '../const';

class PointsModel {
  constructor() {
    this._points = Array.from({ length: COUNT_POINT }, generate_point);
    this._offers = OffersByType;
    this._destinations = Destinations;
  }

  get points() {
    return this._points;
  }

  getOffers(point) {
    if (point) {
      return this._offers.find((x) => x.type === point['type'])['offers'];
    }
    return this._offers;
  }

  getDestination(point) {
    if (point) {
      return this._destinations.find((x) => x.id === point['destination']);
    }
    return this._destinations;
  }
}

export default PointsModel;
