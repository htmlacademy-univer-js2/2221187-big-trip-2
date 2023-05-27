import { createElement } from '../render';

const createTripListTemplate = () => (
  `<ul class="trip-events__list">
  </ul>`
);

class TripListView {
  get _template() {
    return createTripListTemplate();
  }

  get element() {
    if(!this._element) {
      this._element = createElement(this._template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default TripListView;
