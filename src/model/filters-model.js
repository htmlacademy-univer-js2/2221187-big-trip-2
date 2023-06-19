import Observable from "../framework/observable";
import { FILTERS_TYPE } from "../const";

class FiltersModel extends Observable {
    constructor() {
        super();
        this._filter = FILTERS_TYPE.EVERYTHING;
    }

    get filter() {
        return this._filter;
    }

    setFilter = (update_type, filter) => {
        this._filter = filter;
        this._notify(update_type, filter)
    }
}

export default FiltersModel;
