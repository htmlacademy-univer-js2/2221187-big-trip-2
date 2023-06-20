import TripView from './presenter/trip';
import { render } from './framework/render';
import PointsModel from './model/points-model';
import FiltersModel from './model/filters-model';
import FilterPresenter from './presenter/filter';
import NewPointButtonView from './view/new-point-button-view';

const tripContainer = document.querySelector('.trip-events');
const filterContainer = document.querySelector('.trip-controls__filters');
const newPointContainer = document.querySelector('.trip-main');

const pointsModel = new PointsModel();
const filtersModel = new FiltersModel();
const newPointButtonComponent = new NewPointButtonView();

const tripPresenter = new TripView(tripContainer, pointsModel, filtersModel);
const filterPresenter = new FilterPresenter(filterContainer, filtersModel, pointsModel);

const handleNewPointFormClose = () => {
    newPointButtonComponent.element.disabled = false;
  };

const handleNewPointButtonClick = () => {
    tripPresenter.createPoint(handleNewPointFormClose);
    newPointButtonComponent.element.disabled = true;
};

render(newPointButtonComponent, newPointContainer);
newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

tripPresenter.initialize();
filterPresenter.initialize();
