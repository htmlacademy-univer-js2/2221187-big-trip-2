import AbstractView from '../framework/view/abstract-view';

const filter_item_template = (filter, isChecked) => {
  const {name} = filter;
  return (
    `<div class="trip-filters__filter">
      <input id="filter-${name}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${name}" ${isChecked ? 'checked' : ''}>
      <label class="trip-filters__filter-label" for="filter-${name}">${name}</label>
    </div>`);
};

const filter_template = (filterItems) => {
  const filterItemsTemplate = filterItems.map((filter, index) => filter_item_template(filter, index === 0)).join(' ');
  return `<form class="trip-filters" action="#" method="get">
      ${filterItemsTemplate}
      <button class="visually-hidden" type="submit">Accept filter</button>
    </form>`;
};

class FilterView extends AbstractView {
  constructor(filters){
    super();
    this._filters = filters;
  }

  get template() {
    return filter_template(this._filters);
  }
}

export default FilterView;
