import { render } from '../framework/render';
import { update_item, sortings_list } from '../utils';
import { SORTED_TYPE } from '../const';
import NewPointView from '../view/NewPoint';
import SortView from '../view/Sort';
import TripListView from '../view/TripList';
import FirstMessageView from '../view/FirstMessage';
import PointPresenter from './point';

class TripPresenter {
  constructor(container, pointsModel) {
    this._trip_list_component = new TripListView();
    this._container = container;
    this._points_model = pointsModel;
    this._points_list = [];
    this._point_presenter = new Map();

    this._sort_component = new SortView();
    this._current_sort_type = SORTED_TYPE.PRICE;
    this._sourced_points_list = [];
  }

  initialize() {
    this._points_list = sort_by_price(this._points_model._points);
    this._renderTrip();
    this._sourced_points_list = this._points_list;
  }

  _handlePointChange = (updated_point) => {
    this._points_list = update_item(this._points_list, updated_point);
    this._sourced_points_list = update_item(this._sourced_points_list, updated_point);
    this._point_presenter.get(updated_point.id).init(updated_point);
  }

  _sortPoints = (sort_type) => {
    switch (sort_type) {
      case SORTED_TYPE.DAY:
      case SORTED_TYPE.TIME:
      case SORTED_TYPE.PRICE:
        this._points_list = sortings_list[sort_type](this._points_list);
        break;
      default:
        this._points_list = sortings_list[SORTED_TYPE.PRICE](this._points_list);
    }
    this._current_sort_type = sort_type;
  }

  _handleSortTypeChange = (sort_type) => {
    if (sort_type === this._current_sort_type){
      return;
    }

    this._sortPoints(sort_type);
    this._clearPointList();
    this._renderPoints();
  }

  _renderFirstMessage() {
    render(new FirstMessageView(), this._container);
  }

  _renderSort = () => {
    render(this._sort_component, this._container);
    this._sort_component.setSortTypeChangeHandler(this._handleSortTypeChange);
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
