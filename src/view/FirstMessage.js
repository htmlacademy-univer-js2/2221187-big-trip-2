import AbstractView from '../framework/view/abstract-view';

const create_first_message = (message) => (
  `<p class="trip-events__msg">${message}</p>`
);

class FirstMessageView extends AbstractView {
  get template() {
    return create_first_message(this._message);
  }
}

export default FirstMessageView;
