import render from "../render";
import PointView from '../view/Point';
import EditPointView from '../view/EditPoint';
import NewPointView from '../view/NewPoint';
import SortView from '../view/Sort';
import DotsView from "../view/DotsList";
import FormChangeView from "../view/FormChange";
import FormCreateView from "../view/FormCreate";
import FirstMessageView from '../view/FirstMessage';

let dotsCount = 3;

class TripView {
  constructor(container, pointsModel) {
    this._component = new DotsView();
    this._container = container;
    this._pointsModel = pointsModel;
    this._listPoints = this._pointsModel.points;
  }

  init() {
    if (this._listPoints.length === 0) {
      render(new FirstMessageView(), this._container, "beforebegin");
    }
    else {
      render(new SortView(), this._container, "beforebegin");
      render(this._component, this._container, "beforebegin");

      render(new NewPointView(this._pointsModel.getOffers(),
        this._pointsModel.getDestination()), this._component.element, "beforebegin");

      for (let i = 0; i < this._listPoints.length; i++) {
        const currentPoint = this._listPoints[i];
        const currentOffers = this._pointsModel.getOffers(currentPoint);
        const currentDestination = this._pointsModel.getDestination(currentPoint);
        this._renderPoint(currentPoint, currentOffers, currentDestination);
      }
    }
  }
  
  
  _renderPoint(point, offers, destination) {
    const pointComponent = new PointView(point, offers, destination);
    const pointEditComponent = new EditPointView(point, offers, destination);

    const replacePointToForm = () => {
      this._component.element.replaceChild(pointEditComponent.element, pointComponent.element);
    };

    const replaceFormToPoint = () => {
      this._component.element.replaceChild(pointComponent.element, pointEditComponent.element);
    };

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replaceFormToPoint();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    const onSaveButtonClick = (evt) => {
      evt.preventDefault();
      replaceFormToPoint();
      pointEditComponent.element.removeEventListener('submit', onSaveButtonClick);
    };

    const onRollupButtonClick = () => {
      replaceFormToPoint();
      pointEditComponent.element.removeEventListener('click', onRollupButtonClick);
    };

    pointComponent.element.querySelector('.event__rollup-btn').addEventListener('click', () => {
      replacePointToForm();

      document.addEventListener('keydown', onEscKeyDown);

      pointEditComponent.element.querySelector('form').addEventListener('submit', onSaveButtonClick);

      pointEditComponent.element.querySelector('.event__rollup-btn').addEventListener('click', onRollupButtonClick);
    });

    return render(pointComponent, this._component.element, "beforebegin");
  }
}

export default TripView;
