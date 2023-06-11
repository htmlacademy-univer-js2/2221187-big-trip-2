import AbstractView from "../framework/view/abstract-view";

const createSortingItemTemplate = (sorting, isChecked) => {
  const {name, sequence} = sorting;
  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" class="trip-sort__input  visually-hidden" type="radio" name="trip-sort" value="sort-${name}" 
      ${isChecked ? 'checked' : ''}
      ${sequence === null ? 'disabled' : ''}>
      <label class="trip-sort__btn" for="sort-${name}">${name}</label>
    </div>`
  );
};

const sortingTemplate = (sortingItems) => {
  const sortingItemsTemplate = sortingItems.map((sorting, index) => createSortingItemTemplate(sorting, index === 3)).join(' ');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
      ${sortingItemsTemplate}
    </form>`;
};

class SortView extends AbstractView {
  constructor(sorting){
    super()
    this._sorting = sorting
  }
  
  get template() {
    return sortingTemplate(this._sorting);
  }
}

export default SortView;
