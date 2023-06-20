import { render, replace, remove } from '../framework/render';
import PointView from '../view/Point';
import EditPointView from '../view/edit-point';
import { USER_ACTIONS, UPDATE_TYPES } from '../const';
import { getDateDiff } from '../utils';

const Mode = {
    DEFAULT: 'DEFAULT',
    EDITING: 'EDITING'
};

class PointPresenter {
    constructor (trip_list, points, changeDataCallback, modeChangeCallback) {
        this._tripListComponent = trip_list;
        this._pointsModel = points;
        this._point = null;
        this._offers = null;
        this._destination = null;
        this._pointComponent = null;
        this._pointEditComponent = null;
        this._changeData = changeDataCallback;
        this._handleModeChange = modeChangeCallback;
        this._mode = Mode.DEFAULT;
    }

    init(point) {
        const prevPointComponent = this._pointComponent;
        const prevPointEditComponent = this._pointEditComponent;

        this._point = point;

        this._offers = this._pointsModel.getOffers(this._point);
        this._destination = this._pointsModel.getDestination(this._point);
        this._pointComponent = new PointView(this._point, this._offers, this._destination);
        this._pointEditComponent = new EditPointView(this._point, this._offers, this._destination);
        this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);

        this._pointComponent.setEditClickHandler(this._editClickHandler);

        this._pointEditComponent.setFormSubmitHandler(this._formSubmitHandler);

        this._pointEditComponent.setButtonClickHandler(this._buttonClickHandler);

        this._pointEditComponent.setDeleteClickHandler(this._handleDeleteClick);

        if (prevPointComponent === null || prevPointEditComponent === null) {
            render(this._pointComponent, this._tripListComponent);
            return;
        }

        if (this._mode === Mode.DEFAULT) {
            replace(this._pointComponent, prevPointComponent);
        }

        if (this._mode === Mode.EDITING) {
            replace(this._pointEditComponent, prevPointEditComponent);
        }  

        remove(prevPointComponent);
        remove(prevPointEditComponent);
    }

    destroy() {
        remove(this._pointComponent);
        remove(this._pointEditComponent);
    }

    resetView = () => {
        if (this._mode !== Mode.DEFAULT) {
            this._pointEditComponent.reset(this._point);
            this._replaceFormToPoint();
        }
    }

    _replacePointToForm = () => {
        this._handleModeChange()
        this._mode = Mode.EDITING;
        replace(this._pointEditComponent, this._pointComponent);
    };

    _replaceFormToPoint = () => {
        this._mode = Mode.DEFAULT;
        replace(this._pointComponent, this._pointEditComponent);
    };
    
    _handleFavoriteClick = () => {
        this._changeData(USER_ACTIONS.UPDATE_POINT, UPDATE_TYPES.MAJOR,
            { ...this._point, isFavorite: !this._point.isFavorite });
    };

    _onEscKeyDown = (evt) => {
        if (evt.key === 'Escape' || evt.key === 'Esc') {;
          evt.preventDefault();
          this._pointEditComponent.reset(this._point);
          this._replaceFormToPoint();
          document.removeEventListener('keydown', this._onEscKeyDown);
        }
    }

    _editClickHandler = () => {
        this._replacePointToForm();
        document.addEventListener('keydown', this._onEscKeyDown);
    }

    _formSubmitHandler = (point) => {
        const checkMinorUpdate = 
            this._point.basePrice !== point.basePrice ||
            this._point.offers.toString() !== point.offers.toString() ||
            getDateDiff(this._point.dateTo, this._point.dateFrom, 'minute') !==
            getDateDiff(point.dateTo, point.dateFrom, 'minute')
        
        this._replaceFormToPoint();
        this._changeData(
            USER_ACTIONS.UPDATE_POINT,
            checkMinorUpdate ? UPDATE_TYPES.MINOR : UPDATE_TYPES.PATCH,
            point);
        document.removeEventListener('keydown', this._onEscKeyDown);
    }

    _buttonClickHandler = () => {
        this._pointEditComponent.reset(this._point);
        this._replaceFormToPoint();
        document.removeEventListener('keydown', this._onEscKeyDown);
    }
    
    _handleDeleteClick = (point) => {
        this._changeData(
            USER_ACTIONS.DELETE_POINT,
            UPDATE_TYPES.MINOR,
            point
        );
    }
}

export default PointPresenter;
