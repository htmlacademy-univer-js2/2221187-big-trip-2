import { remove, render, replace } from "../framework/render";
import FiltersView from "../view/filters";
import { filters_list } from "../utils";
import { UPDATE_TYPES, FILTERS_TYPE } from "../const";

class FilterPresenter {
    constructor(filter_container, filters_model, points_model) {
        this._filter_container = filter_container;
        this._filter_component = null;
        this._filters_model = filters_model;
        this._points_model = points_model;

        this._points_model.addObserver(this._handleModelEvent);
        this._filters_model.addObserver(this._handleModelEvent);
    }

    get filters() {
        const points = this._points_model.points;

        return [
            {
                type: FILTERS_TYPE.EVERYTHING,
                name: 'everything',
                count: filters_list[FILTERS_TYPE.EVERYTHING](points).length
            },
            {
                type: FILTERS_TYPE.FUTURE,
                name: 'future',
                count: filters_list[FILTERS_TYPE.FUTURE](points).length
            },
            {
                type: FILTERS_TYPE.PAST,
                name: 'past',
                count: filters_list[FILTERS_TYPE.PAST](points).length
            }
        ];
    }

    initialize = () => {
        const filters = this.filters;
        const prev_filter_component = this._filter_component;

        this._filter_component = new FiltersView(filters, this._filters_model.filter);
        this._filter_component.setFilterTypeChangeHandler(this._handleFilterTypeChange);

        if (prev_filter_component === null) {
            render(this._filter_component, this._filter_container);
            return;
        }

        replace(this._filter_component, prev_filter_component);
        remove(prev_filter_component);
    }

    _handleModelEvent = () => {
        this.initialize();
    }

    _handleFilterTypeChange = (filter_type) => {
        if (this._filters_model.filter === filter_type) {
            return;
        }

        this._filters_model.setFilter(UPDATE_TYPES.MAJOR, filter_type);
    }
}

export default FilterPresenter;
