import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = this._popup.querySelector(".popup__picture"); // Selecciona el elemento de la imagen
    this._caption = this._popup.querySelector(".popup__title"); // Selecciona el elemento de la leyenda
  }

  open(imageSrc, imageCaption) {
    this._image.src = imageSrc; // Establece la URL de la imagen
    this._image.alt = imageCaption; // Usa la leyenda como texto alternativo para la accesibilidad
    this._caption.textContent = imageCaption; // Añade el texto de la leyenda
    super.open(); // Llama al método open() de la clase Popup para abrir el popup
  }
}
