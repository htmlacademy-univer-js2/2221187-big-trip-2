import TripView from "./presenter/trip";
import { render } from "./framework/render";
import FilterView from "./view/Filters";
import PointsModel from "./model/points-model";

const filterContainer = document.querySelector(".trip-controls__filters");
const tripContainer = document.querySelector(".trip-events");
const tripPresenter = new TripView(tripContainer);

render(new FilterView(), filterContainer, "beforeend");
tripPresenter.init();
