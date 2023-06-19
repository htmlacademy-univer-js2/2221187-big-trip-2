import { render, replace, remove } from '../framework/render';
import PointView from '../view/Point';
import EditPointView from '../view/EditPoint';

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
        this._change_data({ ...this._point, isFavorite: !this._point.isFavorite });
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
        this._replaceFormToPoint();
        this._change_data(point);
        document.removeEventListener('keydown', this._onEscKeyDown);
    }

    _buttonClickHandler = () => {
        this._point_edit_component.reset(this._point);
        this._replaceFormToPoint();
        document.removeEventListener('keydown', this._onEscKeyDown);
    }
}

export default PointPresenter;
