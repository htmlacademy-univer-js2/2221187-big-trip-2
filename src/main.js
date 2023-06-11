import TripView from "./presenter/trip";
import render from "./render";
import FilterView from "./view/Filters";
import PointsModel from "./model/points-model";

const filterContainer = document.querySelector(".trip-controls__filters");
const tripContainer = document.querySelector(".trip-events");
const pointsModel = new PointsModel();
const tripPresenter = new TripView(tripContainer, pointsModel);

render(new FilterView(), filterContainer, "beforeend");
tripPresenter.init();
