import TripView from './presenter/trip';
import { render } from './framework/render';
import PointsModel from './model/points-model';
import FiltersModel from './model/filters-model';
import FilterPresenter from './presenter/filter';
import NewPointButtonView from './view/new-point-button-view';

const trip_container = document.querySelector('.trip-events');
const filter_container = document.querySelector('.trip-controls__filters');
const new_point_container = document.querySelector('.trip-main');

const points_model = new PointsModel();
const filters_model = new FiltersModel();
const new_point_button_component = new NewPointButtonView();

const trip_presenter = new TripView(trip_container, points_model, filters_model);
const filter_presenter = new FilterPresenter(filter_container, filters_model, points_model);

const handleNewPointFormClose = () => {
    new_point_button_component.element.disabled = false;
  };

const handleNewPointButtonClick = () => {
    trip_presenter.createPoint(handleNewPointFormClose);
    new_point_button_component.element.disabled = true;
};

render(new_point_button_component, new_point_container);
new_point_button_component.setClickHandler(handleNewPointButtonClick);
trip_presenter.initialize();
filter_presenter.initialize();
