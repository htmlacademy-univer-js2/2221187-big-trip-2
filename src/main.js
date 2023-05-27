import TripView from "./presenter/trip";
import { render } from "./framework/render";
import FilterView from "./view/Filters";
import PointsModel from './model/points-model';
import generateFilter from './fish-data/filter';

const filterContainer = document.querySelector(".trip-controls__filters");
const tripContainer = document.querySelector(".trip-events");
const tripPresenter = new TripView(tripContainer);
const pointsModel = new PointsModel();
const filters = generateFilter(pointsModel.points);

render(new FilterView(filters), filterContainer, "beforebegin");
tripPresenter.init();
