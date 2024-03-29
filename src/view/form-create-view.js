import createElement from '../createElement';
import AbstractView from '../framework/view/abstract-view';

const formCreateTemplate = () => {
  const createEventTemplate = (eType, eName) =>
    `<div class="event__type-item">
    <input id="event-type-${eType}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${eType}">
    <label class="event__type-label  event__type-label--${eType}" for="event-type-${eType}-1">${eName}</label>
    </div>`;

  const createOfferTemplate = (type, text, price, checked) =>
    `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${type}-1" type="checkbox"
        name="event-offer-${type}" ${checked ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${type}-1">
        <span class="event__offer-title">${text}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${price}</span>
        </label>
    </div>`;

  const createPhotosTemplate = () => {
    const photosList = [
      'img/photos/1.jpg',
      'img/photos/2.jpg',
      'img/photos/3.jpg',
      'img/photos/4.jpg',
      'img/photos/5.jpg',
    ];

    return photosList.map((p) => `<img class="event__photo" src="${p}" alt="Event photo">`).join('');
  };

  return `<li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
        <header class="event__header">
        <div class="event__type-wrapper">
            <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/flight.png" alt="Event type icon">
            </label>
            <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">
            <div class="event__type-list">
            <fieldset class="event__type-group">
                <legend class="visually-hidden">Event type</legend>
                  ${createEventTemplate('taxi', 'Taxi')}
                  ${createEventTemplate('bus', 'Bus')}
                  ${createEventTemplate('train', 'Train')}
                  ${createEventTemplate('ship', 'Ship')}
                  ${createEventTemplate('drive', 'Drive')}
                  ${createEventTemplate('flight', 'Flight')}
                  ${createEventTemplate('check-in', 'Check-in')}
                  ${createEventTemplate('restaurant', 'Restaurant')}
            </fieldset>
            </div>
        </div>
        <div class="event__field-group  event__field-group--destination">
            <label class="event__label  event__type-output" for="event-destination-1">
            Flight
            </label>
            <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="Geneva" list="destination-list-1">
            <datalist id="destination-list-1">
            <option value="Amsterdam"></option>
            <option value="Geneva"></option>
            <option value="Chamonix"></option>
            </datalist>
        </div>
        <div class="event__field-group  event__field-group--time">
            <label class="visually-hidden" for="event-start-time-1">From</label>
            <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="19/03/19 00:00">
            &mdash;
            <label class="visually-hidden" for="event-end-time-1">To</label>
            <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="19/03/19 00:00">
        </div>
        <div class="event__field-group  event__field-group--price">
            <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
            </label>
            <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="">
        </div>
        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Cancel</button>
        </header>
        <section class="event__details">
        <section class="event__section  event__section--offers">
            <h3 class="event__section-title  event__section-title--offers">Offers</h3>
            <div class="event__available-offers">
              ${createOfferTemplate('luggage', 'Add luggage', 50, true)}
              ${createOfferTemplate('comfort', 'Switch to comfort', 80, true)}
              ${createOfferTemplate('meal', 'Add meal', 15)}
              ${createOfferTemplate('seats', 'Choose seats', 5)}
              ${createOfferTemplate('train', 'Travel by train', 40)}
            </div>
        </section>
        <section class="event__section  event__section--destination">
            <h3 class="event__section-title  event__section-title--destination">Destination</h3>
            <p class="event__destination-description">Geneva is a city in Switzerland that lies at the southern tip of expansive Lac Léman (Lake Geneva). Surrounded by the Alps and Jura mountains, the city has views of dramatic Mont Blanc.</p>
            <div class="event__photos-container">
            <div class="event__photos-tape">
              ${createPhotosTemplate()}
            </div>
            </div>
        </section>
        </section>
    </form>
  </li>
  `;
};

class FormCreateView extends AbstractView {
  get template() {
    return formCreateTemplate();
  }

  get element() {
    if (!this._element) {
      this._element = createElement(this.template);
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}

export default FormCreateView;
