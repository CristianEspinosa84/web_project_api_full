import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit; // Callback para manejar el envío del formulario
    this._form = this._popup.querySelector(".form__popup"); // Selecciona el formulario dentro del popup
    this._inputList = this._form.querySelectorAll("input"); // Selecciona todos los inputs del formulario
    this._submitButton = this._form.querySelector(".form__button"); // Selecciona el botón de envío
    this._submitButtonText = this._submitButton.textContent; // Guarda el texto original del botón
  }

  // Método para cambiar el texto del botón de envío
  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Guardando..."; // Cambia el texto mientras se carga
    } else {
      this._submitButton.textContent = this._submitButtonText; // Restaura el texto original
    }
  }

  // Recopila los valores de los campos de entrada
  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((input) => {
      formValues[input.name] = input.value;
    });
    return formValues;
  }

  // Agrega los eventListeners necesarios
  setEventListeners() {
    super.setEventListeners(); // Llama al setEventListeners() de Popup para el botón de cerrar

    // Agrega el evento submit al formulario
    this._form.addEventListener("submit", (event) => {
      event.preventDefault(); // Evita el comportamiento de recarga del formulario
      this._handleFormSubmit(this._getInputValues()); // Llama al callback con los datos del formulario
      // this.close();
    });
  }

  // Cierra el popup y reinicia el formulario
  close() {
    super.close(); // Llama al método close() de Popup para cerrar el popup
    this._form.reset(); // Reinicia el formulario, limpiando todos los campos
  }
}
