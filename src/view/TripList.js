import AbstractView from '../framework/view/abstract-view';

const TripList_template = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class TripListView extends AbstractView {
  get template() {
    return TripList_template();
  }
}

export default TripListView;
