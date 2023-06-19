import AbstractStatefulView from '../framework/view/abstract-stateful-view';
import { humanize_date, humanize_time, get_final_price } from '../utils';
import OffersByType from '../fish-data/offer';
import Destinations from '../fish-data/destination';
import { CITIES } from '../const';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import dayjs from 'dayjs';


const EditPoint_template = (point, currentOffers, currentDestination) => {
  const {
    type,
    basePrice,
    dateFrom,
    dateTo,
    offers
	} = point;


  const check_point_type = (current_type) => current_type === type ? 'checked' : '';

  const get_offer_template = (offer) => {
    return(
      `<div class="event__offer-selector">
      <input class="event__offer-checkbox  visually-hidden" id="event-offer-comfort-${offer['id']}" type="checkbox" name="event-offer-comfort" ${offers.find((x) => x === offer['id'])? 'checked': '' }>
      <label class="event__offer-label" for="event-offer-comfort-${offer['id']}">
      <span class="event__offer-title">${offer['title']}</span>
      &plus;&euro;&nbsp;
      <span class="event__offer-price">${offer['price']}</span>
      </label>
    </div>`);
  };


  const create_offers_element = () => currentOffers.map(get_offer_template).join(' ');

  const get_photo_template = (photo) => (
    `<img class="event__photo" src="${photo['src']}" alt="Event photo">`
  );

  const create_photos_element = () => currentDestination['pictures'].map(get_photo_template).join(' ');

  return(
    `<li class="trip-events__item">
      <form class="event event--edit" action="#" method="post">
          <header class="event__header">
          <div class="event__type-wrapper">
              <label class="event__type  event__type-btn" for="event-type-toggle-1">
              <span class="visually-hidden">Choose event type</span>
              <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
              </label>
              <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

              <div class="event__type-list">
              <fieldset class="event__type-group">
                  <legend class="visually-hidden">Event type</legend>

                  <div class="event__type-item">
                  <input id="event-type-taxi-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="taxi" ${check_point_type('taxi')}>
                  <label class="event__type-label  event__type-label--taxi" for="event-type-taxi-1">Taxi</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-bus-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="bus" ${check_point_type('bus')}>
                  <label class="event__type-label  event__type-label--bus" for="event-type-bus-1">Bus</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-train-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="train" ${check_point_type('train')}>
                  <label class="event__type-label  event__type-label--train" for="event-type-train-1">Train</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-ship-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="ship" ${check_point_type('ship')}>
                  <label class="event__type-label  event__type-label--ship" for="event-type-ship-1">Ship</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-drive-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="drive" ${check_point_type('drive')}>
                  <label class="event__type-label  event__type-label--drive" for="event-type-drive-1">Drive</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-flight-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="flight" ${check_point_type('flight')}>
                  <label class="event__type-label  event__type-label--flight" for="event-type-flight-1">Flight</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-check-in-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="check-in" ${check_point_type('check-in')}>
                  <label class="event__type-label  event__type-label--check-in" for="event-type-check-in-1">Check-in</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-sightseeing-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="sightseeing" ${check_point_type('sightseeing')}>
                  <label class="event__type-label  event__type-label--sightseeing" for="event-type-sightseeing-1">Sightseeing</label>
                  </div>

                  <div class="event__type-item">
                  <input id="event-type-restaurant-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="restaurant" ${check_point_type('restaurant')}>
                  <label class="event__type-label  event__type-label--restaurant" for="event-type-restaurant-1">Restaurant</label>
                  </div>
              </fieldset>
              </div>
          </div>

          <div class="event__field-group  event__field-group--destination">
              <label class="event__label  event__type-output" for="event-destination-1">
              ${type}
              </label>
              <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${currentDestination['name']}" list="destination-list-1">
              <datalist id="destination-list-1">
              <option value="Amsterdam"></option>
              <option value="Geneva"></option>
              <option value="Chamonix"></option>
              </datalist>
          </div>

          <div class="event__field-group  event__field-group--time">
              <label class="visually-hidden" for="event-start-time-1">From</label>
              <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${humanize_date(dateFrom, 'DD/MM/YY')} ${humanize_time(dateFrom)}">
              &mdash;
              <label class="visually-hidden" for="event-end-time-1">To</label>
              <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${humanize_date(dateTo, 'DD/MM/YY')} ${humanize_time(dateTo)}">
          </div>

          <div class="event__field-group  event__field-group--price">
              <label class="event__label" for="event-price-1">
              <span class="visually-hidden">Price</span>
              &euro;
              </label>
              <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${get_final_price(currentOffers, point)}">
          </div>

          <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
          <button class="event__reset-btn" type="reset">Delete</button>
          <button class="event__rollup-btn" type="button">
              <span class="visually-hidden">Open event</span>
          </button>
          </header>
          <section class="event__details">
          <section class="event__section  event__section--offers">
              <h3 class="event__section-title  event__section-title--offers">Offers</h3>
              ${create_offers_element()}
          </section>

          <section class="event__section  event__section--destination">
              <h3 class="event__section-title  event__section-title--destination">Destination</h3>
              <p class="event__destination-description">${currentDestination['description']}</p>

              <div class="event__photos-container">
              <div class="event__photos-tape">
                ${create_photos_element()}
              </div>
              </div>
          </section>
          </section>
      </form>
    </li>`
  );
};

class EditPointView extends AbstractStatefulView {
  constructor(point, offers, destination) {
	  super();
    this._state = EditPointView.parsePointToState(point);
	  this._offers = offers;
    this._destination = destination;
    this._prev_offers = offers;
    this._prev_destination = destination;
    this._datepicker = null;
    this._setInnerHandlers();
    this._setDatepickerTo();
    this._setDatepickerFrom();
  }

  get template() {
    return EditPoint_template(this._state, this._offers, this._destination);
  }
  
  setFormSubmitHandler = (callback) => {
    this._callback.submit = callback
    this.element.querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formSubmitHandler = (evt) => {
    evt.preventDefault();
    this._callback.submit(EditPointView.parseStateToPoint(this._state));
  }

  setButtonClickHandler = (callback) => {
    this._callback.click = callback
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this._buttonClickHandler);
  }

  _buttonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }

  _priceChangeHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      basePrice: Number(evt.target.value),
    });
  }

  _offersChangeHandler = (evt) => {
    const checked_offer_id = Number(evt.target.id.slice(-1));
    if (this._state.offers.includes(checked_offer_id)) {
      this._state.offers = this._state.offers.filter((x) => x !== checked_offer_id);
    }
    else {
      this._state.offers.push(checked_offer_id);
    }
    this.updateElement({
      offers: this._state.offers,
    });
  };

  _destinationChangeHandler = (evt) => {
    evt.preventDefault();
    const current_city = evt.target.value;
    const current_id = CITIES.find((x) => x.city === current_city)['id'];
    this._destination = Destinations.find((x) => x.id === current_id);
    this.updateElement({ destination: current_id });
  }

  _typeChangeHandler = (evt) => {
    this._offers = OffersByType.find((x) => x.type === evt.target.value)['offers'];
    this.updateElement({ type: evt.target.value, offers: [] });
  }

  _restoreHandlers = () => {
    this._setInnerHandlers();
    this._setDatepickerTo();
    this._setDatepickerFrom();
    this.setFormSubmitHandler(this._callback.submit);
    this.setButtonClickHandler(this._callback.click);
  };

  _setInnerHandlers = () => {
    this.element.querySelector('.event__type-group').addEventListener('change',  this._typeChangeHandler);
    this.element.querySelector('.event__input--destination').addEventListener('change', this._destinationChangeHandler);
    this.element.querySelector('.event__section--offers').addEventListener('change', this._offersChangeHandler);
    this.element.querySelector('.event__input--price').addEventListener('change', this._priceChangeHandler);
  }

  reset = (point) => {
    this._offers = this._prev_offers;
    this._destination = this._prev_destination;
    this.updateElement(EditPointView.parsePointToState(point));
  }

  removeElement = () => {
    super.removeElement();
    if (this._datepicker) {
      this._datepicker.destroy();
      this._datepicker = null;
    }
  };

  _pointDateFromChangeHandler = ([userDate]) => {
    this.updateElement({ dateFrom: userDate });
  };

  _pointDateToChangeHandler = ([userDate]) => {
    this.updateElement({ dateTo: userDate });
  };

  _setDatepickerFrom = () => {
    if (this._state.dateFrom) {
      this._datepicker = flatpickr(
        this.element.querySelector('#event-start-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateFrom,
          minDate: this._state.dateFrom,
          maxDate: this._state.dateTo,
          onChange: this._pointDateFromChangeHandler,
        },
      );
    }
  };

  _setDatepickerTo = () => {
    if (this._state.dateTo) {
      this._datepicker = flatpickr(
        this.element.querySelector('#event-end-time-1'),
        {
          enableTime: true,
          dateFormat: 'd/m/y H:i',
          defaultDate: this._state.dateTo,
          minDate: this._state.dateFrom,
          onChange: this._pointDateToChangeHandler,
        },
      );
    }
  };

  static parsePointToState = (point) => ({...point,
    dateTo: dayjs(point.dateTo).toDate(),
    dateFrom: dayjs(point.dateFrom).toDate()
  });

  static parseStateToPoint = (state) => ({...state})
}

export default EditPointView;
