import { render, remove } from '../framework/render';
import { sortings_list, sort_by_price, filters_list } from '../utils';
import { SORTED_TYPE, FILTERS_TYPE, USER_ACTIONS, UPDATE_TYPES, FILTERS_MESSAGE } from '../const';
import SortView from '../view/Sort';
import TripListView from '../view/TripList';
import FirstMessageView from '../view/FirstMessage';
import PointPresenter from './point';
import NewPointPresenter from './new-point';

class TripPresenter {
  constructor(container, points_model, filters_model) {
    this._trip_list_component = new TripListView();
    this._container = container;
    this._points_model = points_model;
    this._filters_model = filters_model;
    this._points_list = [];
    this._point_presenter = new Map();

    this._sort_component = null;
    this._first_message_component = null;
    this._current_sort_type = SORTED_TYPE.DAY;
    this._new_point_presenter = new NewPointPresenter(this._trip_list_component.element, this._handleViewAction);
    this._sourced_points_list = [];

    this._points_model.addObserver(this._handleModelEvent);
    this._filters_model.addObserver(this._handleModelEvent);
  }

  get points() {
    const points = this._points_model.points;
    const filter_type = this._filters_model.filter;
    const filtered_points = filters_list[filter_type](points);

    switch (this._current_sort_type) {
      case SORTED_TYPE.TIME:
        return sortings_list[this._current_sort_type]([...filtered_points]);
      case SORTED_TYPE.PRICE:
        return filters_list[filter_type](sort_by_price(this._points_model));
      default:
        return sortings_list[SORTED_TYPE.DAY]([...filtered_points]);
    }
  }

  initialize() {
    this._renderTrip();
  }

  createPoint = (callback) => {
    this._current_sort_type = SORTED_TYPE.DAY;
    this._filters_model.setFilter(UPDATE_TYPES.MAJOR, FILTERS_TYPE.EVERYTHING);
    this._new_point_presenter.init(callback);
  }

  _handleSortTypeChange = (sort_type) => {
    if (sort_type === this._current_sort_type) {
      return;
    }

    this._current_sort_type = sort_type;
    this._clearList();
    this._renderTrip(this.points);
  }

  _renderFirstMessage() {
    const filter_type = this._filters_model.filter;
    const message = FILTERS_MESSAGE[filter_type];
    this._first_message_component = new FirstMessageView(message);
    render(this._first_message_component, this._container);
  }

  _renderSort = () => {
    this._sort_component = new SortView(this._current_sort_type);
    render(this._sort_component, this._container);
    this._sort_component.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPoints = (points) => {
    points.forEach(p => this._renderPoint(p));
  }

  _renderTrip() {
    if (this.points.length === 0) {
      this._renderFirstMessage();
      return;
    }

    this._renderSort();
    render(this._trip_list_component, this._container);
    this._renderPoints(this.points);
  }

  _handleModeChange = () => {
    this._new_point_presenter.destroy();
    for (let presenter in this._point_presenter) {
      this._point_presenter[presenter].resetView();
    }
  }

  _handleViewAction = (action_type, update_type, update) => {
    switch (action_type) {
      case USER_ACTIONS.UPDATE_POINT:
        this._points_model.updatePoint(update_type, update)
        break;
      case USER_ACTIONS.ADD_POINT:
        this._points_model.addPoint(update_type, update);
        break;
      case USER_ACTIONS.DELETE_POINT:
        this._points_model.deletePoint(update_type, update);
        break;
    }
  };

  _handleModelEvent = (update_type, point) => {
    point; // unused
    switch (update_type) {
      case UPDATE_TYPES.PATCH:
        this._point_presenter.get(point.id).init(point);
        break;
      case UPDATE_TYPES.MINOR:
        this._clearList();
        this._renderTrip();
        break;
      case UPDATE_TYPES.MAJOR:
        this._clearList({ reset_sort_type: true });
        this._renderTrip();
        break;
    }
  };

  _renderPoint(point) {
    const point_presenter = new PointPresenter(this._trip_list_component.element, this._points_model,
      this._handleViewAction, this._handleModeChange);
    point_presenter.init(point);
    this._point_presenter.set(point.id, point_presenter);
  }

  _clearList = ({reset_sort_type = false} = {}) => {
    this._new_point_presenter.destroy();
    this._point_presenter.forEach((presenter) => presenter.destroy());
    this._point_presenter.clear();
    
    remove(this._sort_component)
    remove(this._first_message_component)

    if (reset_sort_type) {
      this._currentSortType = SORTED_TYPE.DAY
    }
  }
}
export default TripPresenter;
