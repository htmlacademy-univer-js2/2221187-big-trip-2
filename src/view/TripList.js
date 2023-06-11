import AbstractView from '../framework/view/abstract-view';

const createTripListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class TripListView extends AbstractView {
  get template() {
    return createTripListTemplate();
  }
}

export default TripListView;
