import AbstractView from '../framework/view/abstract-view';
import { fileURLToPath } from "url";

const filter_item_template = (filter, current_filter) => {
  const {name, type} = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter"
      value="${name}"${type === current_filter ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`);
};

const filter_template = (filter_items, current_filter) => {
  const filterItemsTemplate = filter_items.map((filter) => filter_item_template(filter, current_filter)).join(' ');
  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

class FilterView extends AbstractView {
  constructor(filters, current_filter){
    super();
    this._filters = filters;
    this._current_filter = current_filter;
  }

  get template() {
    return filter_template(this._filters, this._current_filter);
  }
  
  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('change', this._filterTypeChangeHandler);
  };

  _filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  };
}

export default FilterView;
