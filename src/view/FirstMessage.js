import { createElement } from '../render';

const createFirstMessage = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class FirstMessageView {
  get template() {
    return createFirstMessage(this._message);
  }

  get element() {
    if(!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FirstMessageView;