import createElement from '../createElement';

const dotsTemplate = () => `<ul class="trip-events__list"></ul>`;

class DotsView {
  getTemplate() {
    return dotsTemplate();
  }
  
  get element() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this.element = null;
  }
}

export default DotsView;
