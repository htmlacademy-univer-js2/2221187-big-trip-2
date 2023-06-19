import { render } from '../framework/render';
import { update_item } from '../utils';
import NewPointView from '../view/NewPoint';
import SortView from '../view/Sort';
import TripListView from '../view/TripList';
import FirstMessageView from '../view/FirstMessage';
import generate_sorting from '../fish-data/sorting';
import PointPresenter from './point';

class TripPresenter {
  constructor(container, pointsModel) {
    this._trip_list_component = new TripListView();
    this._container = container;
    this._points_model = pointsModel;
    this._points_list = [];
    this._point_presenter = new Map();
  }

  initialize() {
    this._points_list = this._points_model._points;
    this._renderTrip();
  }

  _handlePointChange = (updated_point) => {
    this._points_list = update_item(this._points_list, updated_point);
    this._point_presenter.get(updated_point.id).init(updated_point);
  }

  _renderFirstMessage() {
    render(new FirstMessageView(), this._container);
  }

  _renderSort() {
    const sorting = generate_sorting(this._points_model._points);

    render(new SortView(sorting), this._container);
  }

  _renderNewPoint() {
    render(new NewPointView(this._points_model.getOffers(), this._points_model.getDestination()),
      this._trip_list_component.element, 'beforebegin');
  }

  _renderPoints() {
    for (let point in this._points_list) {
      this._renderPoint(this._points_list[point]);
    }
  }

  _renderTripList() {
    render(this._trip_list_component, this._container);
    this._renderPoints();
  }

  _renderTrip() {
    if (this._points_list.length === 0) {
      this._renderFirstMessage();
      return;
    }

    this._renderSort();
    this._renderTripList();
  }

  _handleModeChange = () => {
    for (let presenter in this._point_presenter) {
      this._point_presenter[presenter].resetView();
    }
  }

  _renderPoint(point) {
    const point_presenter = new PointPresenter(this._trip_list_component.element, this._points_model,
      this._handlePointChange, this._handleModeChange);
    point_presenter.init(point);
    this._point_presenter.set(point.id, point_presenter);
  }

  _clearPointList() {
    for (let point_presenter in this._point_presenter) {
      this._point_presenter[point_presenter].destroy();
    }
    this._point_presenter.clear();
  }
}
export default TripPresenter;
