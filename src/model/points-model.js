import generate_point from '../fish-data/point';
import Observable from '../framework/observable';
import offersByType from '../fish-data/offer';
import Destinations from '../fish-data/destination';
import { COUNT_POINT } from '../const';

class PointsModel extends Observable {
  constructor() {
    super();
    this._points = Array.from({ length: COUNT_POINT }, generate_point);
    this._offers = offersByType;
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

  updatePoint = (updateType, points) => {
    const updatedIndex = this._points.findIndex(point => point.id === points.id);

    this._points = [
      ...this._points.slice(0, updatedIndex),
      points,
      ...this._points.slice(updatedIndex + 1)
    ];

    this._notify(updateType, points);
  }

  addPoint = (updateType, points) => {
    this._points = [points, 
      ...this._points];

    this._notify(updateType, points);
  }

  deletePoint = (updateType, points) => {
    const deletedIndex = this._points.findIndex((point) => point.id === points.id);

    this._points = [
      ...this._points.slice(0, deletedIndex),
      ...this._points.slice(deletedIndex + 1)
    ]

    this._notify(updateType, points);
  }
}

export default PointsModel;
