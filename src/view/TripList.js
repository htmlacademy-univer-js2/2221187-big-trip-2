import { createElement } from '../render';

const createTripListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class TripListView {
  getTemplate() {
    return createTripListTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}

export default TripListView;
