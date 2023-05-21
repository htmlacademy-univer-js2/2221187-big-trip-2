import render from "../render";
import PointView from '../view/Point';
import EditPointView from '../view/EditPoint';
import NewPointView from '../view/NewPoint';
import SortView from '../view/Sort';
import DotsView from "../view/DotsList";
import FormChangeView from "../view/FormChange";
import FormCreateView from "../view/FormCreate";

let dotsCount = 3;

class TripView {
  constructor(container, pointsModel) {
    this.component = new DotsView();
    this.container = container;
    this.pointsModel = pointsModel;
    this.listPoints = this.pointsModel.getPoints();
  }

  init() {
    render(new SortView(), this.container, "beforebegin");
    render(this.component, this.container, "beforebegin");
    render(new FormChangeView(), this.component.getElement(), "beforebegin");

    for (let i = 0; i < dotsCount; i++) {
      render(new FormCreateView(), this.component.getElement(), "beforebegin");
    }
	
    render(new EditPointView(this.listPoints[0]), this.component.getElement());
    for (let i = 0; i < this.listPoints.length; i++) {
      render(new PointView(this.listPoints[i]), this.component.getElement());
    }
  }
}

export default TripView;
