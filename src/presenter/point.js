import { render, replace, remove } from '../framework/render';
import PointView from '../view/Point';
import EditPointView from '../view/EditPoint';
import { USER_ACTIONS, UPDATE_TYPES } from '../const';
import { get_date_diff } from '../utils';

const Mode = {
    DEFAULT: 'DEFAULT',
    EDITING: 'EDITING'
};

class PointPresenter {
    constructor (trip_list, points, change_data, mode_change) {
        this._trip_list_component = trip_list;
        this._points_model = points;
        this._point = null;
        this._offers = null;
        this._destination = null;
        this._point_component = null;
        this._point_edit_component = null;
        this._change_data = change_data;
        this._handle_mode_change = mode_change;
        this._mode = Mode.DEFAULT;
    }

    init(point) {
        const prev_point_component = this._point_component;
        const prev_point_edit_component = this._point_edit_component;

        this._point = point;

        this._offers = this._points_model.getOffers(this._point);
        this._destination = this._points_model.getDestination(this._point);
        this._point_component = new PointView(this._point, this._offers, this._destination);
        this._point_edit_component = new EditPointView(this._point, this._offers, this._destination);
        this._point_component.setFavoriteClickHandler(this._handleFavoriteClick);

        this._point_component.setEditClickHandler(this._editClickHandler);

        this._point_edit_component.setFormSubmitHandler(this._formSubmitHandler);

        this._point_edit_component.setButtonClickHandler(this._buttonClickHandler);

        this._point_edit_component.setDeleteClickHandler(this._handleDeleteClick);

        if (prev_point_component === null || prev_point_edit_component === null) {
            render(this._point_component, this._trip_list_component);
            return;
        }

        if (this._mode === Mode.DEFAULT) {
            replace(this._point_component, prev_point_component);
        }

        if (this._mode === Mode.EDITING) {
            replace(this._point_edit_component, prev_point_edit_component);
        }  

        remove(prev_point_component);
        remove(prev_point_edit_component);
    }

    destroy() {
        remove(this._point_component);
        remove(this._point_edit_component);
    }

    resetView = () => {
        if (this._mode !== Mode.DEFAULT) {
            this._point_edit_component.reset(this._point);
            this._replaceFormToPoint();
        }
    }

    _replacePointToForm = () => {
        this._handle_mode_change()
        this._mode = Mode.EDITING;
        replace(this._point_edit_component, this._point_component);
    };

    _replaceFormToPoint = () => {
        this._mode = Mode.DEFAULT;
        replace(this._point_component, this._point_edit_component);
    };
    
    _handleFavoriteClick = () => {
        this._change_data(USER_ACTIONS.UPDATE_POINT, UPDATE_TYPES.MAJOR,
            { ...this._point, isFavorite: !this._point.isFavorite });
    };

    _onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {;
          evt.preventDefault();
          this._point_edit_component.reset(this._point);
          this._replaceFormToPoint();
          document.removeEventListener('keydown', this._onEscKeyDown);
        }
    }

    _editClickHandler = () => {
        this._replacePointToForm();
        document.addEventListener('keydown', this._onEscKeyDown);
    }

    _formSubmitHandler = (point) => {
        const is_minor_update = 
            this._point.basePrice !== point.basePrice ||
            this._point.offers.toString() !== point.offers.toString() ||
            get_date_diff(this._point.dateTo, this._point.dateFrom, 'minute') !==
            get_date_diff(point.dateTo, point.dateFrom, 'minute')
        
        this._replaceFormToPoint();
        this._change_data(
            USER_ACTIONS.UPDATE_POINT,
            is_minor_update ? UPDATE_TYPES.MINOR : UPDATE_TYPES.PATCH,
            point);
        document.removeEventListener('keydown', this._onEscKeyDown);
    }

    _buttonClickHandler = () => {
        this._point_edit_component.reset(this._point);
        this._replaceFormToPoint();
        document.removeEventListener('keydown', this._onEscKeyDown);
    }
    
    _handleDeleteClick = (point) => {
        this._change_data(
            USER_ACTIONS.DELETE_POINT,
            UPDATE_TYPES.MINOR,
            point
        );
    }
}

export default PointPresenter;
