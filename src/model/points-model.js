import generate_point from '../fish-data/point';
import Observable from '../framework/observable';
import OffersByType from '../fish-data/offer';
import Destinations from '../fish-data/destination';
import { COUNT_POINT } from '../const';

class PointsModel extends Observable {
  constructor() {
    super();
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

  updatePoint = (update_type, points) => {
    const updated_index = this._points.findIndex(point => point.id === points.id);

    this._points = [
      ...this._points.slice(0, updated_index),
      points,
      ...this._points.slice(updated_index + 1)
    ];

    this._notify(update_type, points);
  }

  addPoint = (update_type, points) => {
    this._points = [points, 
      ...this._points];

    this._notify(update_type, points);
  }

  deletePoint = (update_type, points) => {
    const deleted_index = this._points.findIndex((point) => point.id === points.id);

    this._points = [
      ...this._points.slice(0, deleted_index),
      ...this._points.slice(deleted_index + 1)
    ]

    this._notify(update_type, points);
  }
}

export default PointsModel;
