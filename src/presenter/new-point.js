import { remove, render, RenderPosition } from "../framework/render";
import EditPointView from "../view/EditPoint";
import { nanoid } from "nanoid";
import { USER_ACTIONS, UPDATE_TYPES } from "../const";

class NewPointPresenter {
  constructor(point_list_container, change_data) {
    this._point_list_container = point_list_container;
    this._change_data = change_data;
    this._destroy_callback = null
    this._point_edit_component = null;
  }

  init(callback) {
    this._destroy_callback = callback;

    if (this._point_edit_component !== null) {
      return;
    }

    this._point_edit_component = new EditPointView();
    this._point_edit_component.setFormSubmitHandler(this._handleFormSubmit);
    this._point_edit_component.setDeleteClickHandler(this._handleDeleteClick);

    render(this._point_edit_component, this._point_list_container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this._escKeyDownHandler);
  };

  destroy = () => {
    if (this._point_edit_component === null) {
      return;
    }

    this._destroy_callback?.();

    remove(this._point_edit_component);
    this._point_edit_component = null;

    document.removeEventListener('keydown', this._escKeyDownHandler);
  };

  _handleFormSubmit = (point) => {
    this._change_data(USER_ACTIONS.ADD_POINT, UPDATE_TYPES.MINOR, {id: nanoid(), ...point});
    this.destroy();
  };

  _handleDeleteClick = () => {
    this.destroy();
  };

  _escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };
}

export default NewPointPresenter;