import { render, replace } from '../framework/render';
import PointView from '../view/Point';
import EditPointView from '../view/EditPoint';
import NewPointView from '../view/NewPoint';
import SortView from '../view/Sort';
import TripListView from '../view/TripList';
import FirstMessageView from '../view/FirstMessage';
import generate_sorting from '../fish-data/sorting';

class TripPresenter {
  constructor(container, pointsModel) {
    this._trip_list_component = new TripListView();
    this._container = container;
    this._points_model = pointsModel;
    this._points_list = [];
  }

  initialize() {
    this._points_list = this._points_model._points;
    this._renderTrip();
  }

  _renderTrip() {
    if (this._points_list.length === 0) {
      render(new FirstMessageView(), this._container);
    }
    else {
      const sorting = generate_sorting(this._points_model._points);

      render(new SortView(sorting), this._container);
      render(this._trip_list_component, this._container);
      render(new NewPointView(this._points_model.getOffers(), this._points_model.getDestination()),
        this._trip_list_component.element, 'beforebegin');
      
      for (let i = 0; i < this._points_list.length; i++) {
        const current_point = this._points_list[i];
        const point_offers = this._points_model.getOffers(current_point);
        const point_destination = this._points_model.getDestination(current_point);
        this._renderPoint(current_point, point_offers, point_destination);
      }
    }
  }

  _renderPoint(point, offers, destination) {
    const point_component = new PointView(point, offers, destination);
    const point_edit_component = new EditPointView(point, offers, destination);

    const onEscKeyDown = (evt) => {
      if (evt.key === 'Escape' || evt.key === 'Esc') {
        evt.preventDefault();
        replace(point_component, point_edit_component);
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };

    point_component.setEditClickHandler(() => {
      replace(point_edit_component, point_component);
      document.addEventListener('keydown', onEscKeyDown);
    });

    point_edit_component.setFormSubmitHandler(() => {
      replace(point_component, point_edit_component);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    point_edit_component.setButtonClickHandler(() => {
      replace(point_component, point_edit_component);
      document.removeEventListener('keydown', onEscKeyDown);
    });

    render(point_component, this._trip_list_component.element);
  }
}
export default TripPresenter;
