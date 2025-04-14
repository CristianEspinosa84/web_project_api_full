import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._confirmButton = this._popup.querySelector(".confirmation__button"); // Selecciona el botón de confirmación dentro del popup
  }

  setSubmitAction(action) {
    this._handleSubmit = action; // Define la acción a ejecutar en la confirmación
  }

  setEventListeners() {
    super.setEventListeners(); // Llama al método de la clase padre para cerrar el popup

    this._confirmButton.addEventListener("click", (event) => {
      event.preventDefault();
      if (this._handleSubmit) {
        this._handleSubmit(); // Llama al callback cuando se hace clic en el botón de confirmación
      }
    });
  }
}
