import { render, replace } from '../framework/render';
import PointView from '../view/Point';
import EditPointView from '../view/EditPoint';
import NewPointView from '../view/NewPoint';
import SortView from '../view/Sort';
import TripListView from '../view/TripList';
import FirstMessageView from '../view/FirstMessage';
import generateSorting from '../fish-data/sorting';

class TripPresenter {
  constructor(container, pointsModel) {
    this._tripListComponent = new TripListView();
    this._container = container;
    this._pointsModel = pointsModel;
    this._listPoints = [];
  }
  init() {
    this._listPoints = this._pointsModel._points;
    this._renderTrip();
  }
  _renderTrip() {
    if (this._listPoints.length === 0) {
      render(new FirstMessageView(), this._container);
    }
    else {
      const sorting = generateSorting(this._pointsModel._points)
      render(new SortView(sorting), this._container);
      render(this._tripListComponent, this._container);
      render(new NewPointView(this._pointsModel.getOffers(),
      this._pointsModel.getDestination()), this._tripListComponent.element, "beforebegin");
      for (let i = 0; i < this._listPoints.length; i++) {
        const currentPoint = this._listPoints[i];
        const curretnOffers = this._pointsModel.getOffers(currentPoint);
        const currentDesctination = this._pointsModel.getDestination(currentPoint);
        this._renderPoint(currentPoint, curretnOffers, currentDesctination);
      }
    }
  }
  _renderPoint(point, offers, destination) {
    const pointComponent = new PointView(point, offers, destination);
    const pointEditComponent = new EditPointView(point, offers, destination);
    const replacePointToForm = () => {
      replace(pointEditComponent, pointComponent);
    };
    const replaceFormToPoint = () => {
      replace(pointComponent, pointEditComponent);
    };
    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    pointComponent.setEditClickHandler(() => {
      replacePointToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });
	pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToPoint()
      document.removeEventListener('keydown', onEscKeyDown);
    });
	pointEditComponent.setButtonClickHandler(() => {
      replaceFormToPoint()
      document.removeEventListener('keydown', onEscKeyDown);
	});
    return render(pointComponent, this._tripListComponent.element);
  }
}
export default TripPresenter;