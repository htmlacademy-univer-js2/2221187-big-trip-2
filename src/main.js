import TripView from './presenter/trip';
import { render } from './framework/render';
import FilterView from './view/Filters';
import PointsModel from './model/points-model';
import generate_filter from './fish-data/filter';

const trip_container = document.querySelector('.trip-events');
const filter_container = document.querySelector('.trip-controls__filters');
const points_model = new PointsModel();
const filters = generate_filter(points_model.points);
const trip_presenter = new TripView(trip_container, points_model);

render(new FilterView(filters), filter_container, 'beforeend');
trip_presenter.initialize();
