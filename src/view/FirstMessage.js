import AbstractView from '../framework/view/abstract-view';

const create_first_message = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class FirstMessageView extends AbstractView {
  constructor(message) {
    super();
    this._message = message;
  }

  get template() {
    return create_first_message(this._message);
  }
}

export default FirstMessageView;
