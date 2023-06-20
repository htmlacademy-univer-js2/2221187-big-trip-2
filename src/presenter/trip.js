import { render, remove } from '../framework/render';
import { sortingsList, sortByPrice, filtersList } from '../utils';
import { SORTED_TYPE, FILTERS_TYPE, USER_ACTIONS, UPDATE_TYPES, FILTERS_MESSAGE } from '../const';
import SortView from '../view/sort';
import TripListView from '../view/trip-list';
import FirstMessageView from '../view/first-message';
import PointPresenter from './point';
import NewPointPresenter from './new-point';

class TripPresenter {
  constructor(container, pointsModel, filtersModel) {
    this._tripListComponent = new TripListView();
    this._container = container;
    this._pointsModel = pointsModel;
    this._filtersModel = filtersModel;
    this._points_list = [];
    this._pointPresenter = new Map();

    this._sortComponent = null;
    this._firstMessageComponent = null;
    this._currentSortType = SORTED_TYPE.DAY;
    this._newPointPresenter = new NewPointPresenter(this._tripListComponent.element, this._handleViewAction);

    this._pointsModel.addObserver(this._handleModelEvent);
    this._filtersModel.addObserver(this._handleModelEvent);
  }

  get points() {
    const points = this._pointsModel.points;
    const filterType = this._filtersModel.filter;
    const filteredPoints = filtersList[filterType](points);

    switch (this._currentSortType) {
      case SORTED_TYPE.TIME:
        return sortingsList[this._currentSortType]([...filteredPoints]);
      case SORTED_TYPE.PRICE:
        return filtersList[filterType](sortByPrice(this._pointsModel));
      default:
        return sortingsList[SORTED_TYPE.DAY]([...filteredPoints]);
    }
  }

  initialize() {
    this._renderTrip();
  }

  createPoint = (callback) => {
    this._currentSortType = SORTED_TYPE.DAY;
    this._filtersModel.setFilter(UPDATE_TYPES.MAJOR, FILTERS_TYPE.EVERYTHING);
    this._newPointPresenter.init(callback);
  }

  _handleSortTypeChange = (sortType) => {
    if (sortType === this._currentSortType) {
      return;
    }

    this._currentSortType = sortType;
    this._clearList();
    this._renderTrip(this.points);
  }

  _renderFirstMessage() {
    const filterType = this._filtersModel.filter;
    const message = FILTERS_MESSAGE[filterType];
    this._firstMessageComponent = new FirstMessageView(message);
    render(this._firstMessageComponent, this._container);
  }

  _renderSort = () => {
    this._sortComponent = new SortView(this._currentSortType);
    render(this._sortComponent, this._container);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
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
    render(this._tripListComponent, this._container);
    this._renderPoints(this.points);
  }

  _handleModeChange = () => {
    this._newPointPresenter.destroy();
    for (let presenter in this._pointPresenter) {
      this._pointPresenter[presenter].resetView();
    }
  }

  _handleViewAction = (action_type, updateType, point) => {
    switch (action_type) {
      case USER_ACTIONS.UPDATE_POINT:
        this._pointsModel.updatePoint(updateType, point)
        break;
      case USER_ACTIONS.ADD_POINT:
        this._pointsModel.addPoint(updateType, point);
        break;
      case USER_ACTIONS.DELETE_POINT:
        this._pointsModel.deletePoint(updateType, point);
        break;
    }
  };

  _handleModelEvent = (updateType, point) => {
    point; // unused
    switch (updateType) {
      case UPDATE_TYPES.PATCH:
        this._pointPresenter.get(point.id).init(point);
        break;
      case UPDATE_TYPES.MINOR:
        this._clearList();
        this._renderTrip();
        break;
      case UPDATE_TYPES.MAJOR:
        this._clearList({ resetSortType: true });
        this._renderTrip();
        break;
    }
  };

  _renderPoint(point) {
    const point_presenter = new PointPresenter(this._tripListComponent.element, this._pointsModel,
      this._handleViewAction, this._handleModeChange);
    point_presenter.init(point);
    this._pointPresenter.set(point.id, point_presenter);
  }

  _clearList = ({resetSortType: resetSortType = false} = {}) => {
    this._newPointPresenter.destroy();
    this._pointPresenter.forEach((presenter) => presenter.destroy());
    this._pointPresenter.clear();
    
    remove(this._sortComponent)
    remove(this._firstMessageComponent)

    if (resetSortType) {
      this._currentSortType = SORTED_TYPE.DAY
    }
  }
}
export default TripPresenter;
